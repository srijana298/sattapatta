import { Injectable } from '@nestjs/common';
import {
  CreateConversationDto,
  CreateMessageDto,
} from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './entities/conversation.entity';
import { ConversationParticipant } from './entities/participant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConversationListItem,
  ConversationParticipantResponse,
  ConversationRawQuery,
} from './conversation.types';
import { Message } from './entities/message.entity';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(ConversationParticipant)
    private readonly participantService: Repository<ConversationParticipant>,
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async sendMessage(conversation: number, messageDto: CreateMessageDto) {
    const { content, participant } = messageDto;
    const message = new Message();
    Object.assign(message, {
      content,
      participant,
      conversation,
    });
    const _saved = await this.messageRepository.save(message);
    const savedMessage = await this.messageRepository.findOne({
      where: {
        id: _saved.id,
      },
      relations: ['participant', 'participant.user'],
    });
    return savedMessage!;
  }

  async create(user_id: number, createConversationDto: CreateConversationDto) {
    const participantIds = [user_id, createConversationDto.receiver_id];
    const existingConversation = await Conversation.createQueryBuilder(
      'conversation',
    )
      .innerJoin('conversation.participants', 'participant')
      .innerJoin('participant.user', 'user')
      .where('user.id IN (:...userIds)', { userIds: participantIds })
      .groupBy('conversation.id')
      .having('COUNT(DISTINCT user.id) = 2')
      .select(['conversation.id']) // Select only necessary columns
      .getOne();

    if (existingConversation) {
      return existingConversation.id;
    }

    const newConversation = Conversation.create();
    const savedConversation =
      await this.conversationRepository.save(newConversation);

    await this.participantService.insert([
      {
        conversation: {
          id: savedConversation.id,
        },
        user: {
          id: createConversationDto.receiver_id,
        },
      },
      {
        conversation: {
          id: savedConversation.id,
        },
        user: {
          id: user_id,
        },
      },
    ]);
    return savedConversation.id;
  }

  async findAll(userId: number): Promise<ConversationListItem[]> {
    const subQuery = this.conversationRepository.manager
      .createQueryBuilder()
      .select('m1.*')
      .from('message', 'm1')
      .innerJoin(
        (qb) =>
          qb
            .select('conversationId', 'conversationId')
            .addSelect('MAX(created_at)', 'max_created')
            .from('message', 'm2')
            .groupBy('conversationId'),
        'latest',
        'latest.conversationId = m1.conversationId AND latest.max_created = m1.created_at',
      );

    const result: ConversationRawQuery[] = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoin('conversation.participants', 'participant')
      .leftJoin('participant.user', 'user')
      .leftJoin('user.mentor_profile', 'mentorProfile')
      .leftJoin(
        '(' + subQuery.getQuery() + ')',
        'lastMessage',
        'lastMessage.conversationId = conversation.id',
      )
      .setParameters(subQuery.getParameters())
      .select([
        'conversation.id as conversation_id',
        'conversation.created_at as conversation_created_at',
        'conversation.updated_at as conversation_updated_at',
        // Use GROUP_CONCAT or JSON aggregation to get all participants
        'GROUP_CONCAT(DISTINCT CONCAT(user.id, ":", user.fullname, ":", user.role, ":", user.email, ":", COALESCE(mentorProfile.id, ""))) as participants_data',
        'lastMessage.id as last_message_id',
        'lastMessage.content as last_message_content',
        'lastMessage.created_at as last_message_created_at',
      ])
      .where(
        'conversation.id IN (SELECT DISTINCT c.id FROM conversation c LEFT JOIN conversation_participant cp ON c.id = cp.conversationId LEFT JOIN users u ON cp.userId = u.id WHERE u.id = :userId)',
        { userId },
      )
      .groupBy('conversation.id')
      .addGroupBy('lastMessage.id')
      .addGroupBy('lastMessage.content')
      .addGroupBy('lastMessage.created_at')
      .getRawMany();

    const processedResult: ConversationListItem[] = result.map(
      (row: ConversationRawQuery) => {
        const participants: ConversationParticipantResponse[] =
          row.participants_data
            ? row.participants_data.split(',').map((p: string) => {
                const [id, fullname, role, email, mentorProfileId] =
                  p.split(':');
                return {
                  user: {
                    id: parseInt(id, 10),
                    fullname: fullname || '',
                    role: role || '',
                    email: email || '',
                    mentor_profile:
                      mentorProfileId && mentorProfileId !== ''
                        ? { id: parseInt(mentorProfileId, 10) }
                        : null,
                  },
                };
              })
            : [];

        const currentUser: ConversationParticipantResponse | undefined =
          participants.find((p) => p.user.id === userId);

        const otherParticipants: ConversationParticipantResponse[] =
          participants.filter((p) => p.user.id !== userId);

        return {
          id: row.conversation_id,
          created_at: row.conversation_created_at,
          updated_at: row.conversation_updated_at,
          participants,
          currentUser,
          otherParticipants,
          lastMessage: {
            id: row.last_message_id,
            content: row.last_message_content,
            participant: row.participants_data,
            created_at: row.last_message_created_at,
          },
        };
      },
    );

    return processedResult;
  }

  async findOne(id: number) {
    const result = await this.conversationRepository.findOne({
      relations: [
        'participants',
        'participants.user',
        'participants.user.mentor_profile',
        'messages',
        'messages.participant',
        'messages.participant.user',
      ],
      where: {
        id,
      },
      select: {
        id: true,
        participants: {
          id: true,
          user: {
            id: true,
            fullname: true,
            email: true,
            mentor_profile: {
              id: true,
            },
          },
        },
        messages: {
          id: true,
          content: true,
          created_at: true,
          participant: {
            id: true,
            user: {
              id: true,
            },
          },
        },
      },
      order: {
        messages: {
          id: 'ASC',
        },
      },
    });
    return result;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
