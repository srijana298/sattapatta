import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { MentorService } from './mentor.service';
import { CreateMentorDto, CreateRatingDto } from './dto/create-mentor.dto';
import {
  AboutMentorDto,
  CreateCertificateInputDto,
  CreateDescriptionDto,
  CreateEducationDto,
} from './dto/update-mentor.dto';
import { AuthGuard } from 'src/auth.guard';
import { AuthRequest } from 'src/AuthRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('mentor')
export class MentorController {
  constructor(private readonly mentorService: MentorService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createMentorDto: CreateMentorDto,
    @Req() request: AuthRequest,
  ) {
    const userId = request.user.id;
    return this.mentorService.create(userId, createMentorDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const mentor = await this.mentorService.findOne(+id);

    if (!mentor) {
      throw new NotFoundException("Mentor doesn't exist");
    }

    return mentor;
  }

  @Get()
  findAll(@Query('status') status?: string) {
    return this.mentorService.findAll(status);
  }

  @UseGuards(AuthGuard)
  @Put('/:id/update-status')
  async updateStatus(@Body('status') status: string, @Param('id') id: string) {
    const mentor = await this.mentorService.findOne(+id);
    if (!mentor) {
      throw new NotFoundException("Mentor doesn't exist");
    }
    await this.mentorService.updateStatus(+id, status);
    return mentor.id;
  }

  @UseGuards(AuthGuard)
  @Get('/picture')
  async getProfilePicture(@Req() request: AuthRequest) {
    const mentorProfile = await this.mentorService.findProfile(request.user.id);

    if (!mentorProfile) {
      throw new NotFoundException("Mentor profile doesn't exist");
    }

    return this.mentorService.getPicture(mentorProfile.id);
  }

  @UseGuards(AuthGuard)
  @Post('/picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
      }),
    }),
  )
  createPicture(
    @Req() request: AuthRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return file.path;
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Req() request: AuthRequest) {
    return this.mentorService.findProfile(request.user.id);
  }
  @UseGuards(AuthGuard)
  @Get('/educations')
  getEducations(@Req() request: AuthRequest) {
    return this.mentorService.getEducations(request.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('/educations')
  async creatEducations(
    @Req() request: AuthRequest,
    @Body() body: CreateEducationDto,
  ) {
    const mentorProfile = await this.mentorService.findProfile(request.user.id);

    if (!mentorProfile) {
      throw new NotFoundException("Mentor profile doesn't exist");
    }
    mentorProfile.has_education = Boolean(body.has_education);
    await mentorProfile.save();

    return this.mentorService.createEducation(
      mentorProfile.id,
      body.educations,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/certificates')
  getCertificates(@Req() request: AuthRequest) {
    return this.mentorService.getCertificates(request.user.id);
  }

  @UseGuards(AuthGuard)
  @Delete('/certificates/:id')
  deleteCertificate(@Param('id') id: string) {
    return this.mentorService.deleteCertificates(+id);
  }

  @UseGuards(AuthGuard)
  @Put('/certificates')
  async updateCertificates(
    @Req() request: AuthRequest,
    @Body() body: CreateCertificateInputDto,
  ) {
    const mentorProfile = await this.mentorService.findProfile(request.user.id);

    if (!mentorProfile) {
      throw new NotFoundException("Mentor profile doesn't exist");
    }
    mentorProfile.has_certificate = Boolean(body.hasTeachingCertificate);
    await mentorProfile.save();
    const response = await this.mentorService.saveCertificates(
      mentorProfile.id,
      body.certificates,
    );
    return {
      ...response,
      has_certificate: mentorProfile.has_certificate,
    };
  }

  @UseGuards(AuthGuard)
  @Put('/about')
  saveAboutProfile(
    @Body() aboutMentorDto: AboutMentorDto,
    @Req() req: AuthRequest,
  ) {
    return this.mentorService.saveAboutProfile(req.user.id, aboutMentorDto);
  }

  @UseGuards(AuthGuard)
  @Get('/about')
  getAboutProfile(@Req() req: AuthRequest) {
    return this.mentorService.getAboutProfile(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('/description')
  async createDescription(
    @Req() req: AuthRequest,
    @Body() body: CreateDescriptionDto,
  ) {
    const mentorProfile = await this.mentorService.findProfile(req.user.id);

    if (!mentorProfile) {
      throw new NotFoundException("Mentor profile doesn't exist");
    }

    return this.mentorService.createDescription(mentorProfile.id, body);
  }

  @UseGuards(AuthGuard)
  @Get('/description')
  async getDescription(@Req() req: AuthRequest) {
    const mentorProfile = await this.mentorService.findProfile(req.user.id);

    if (!mentorProfile) {
      throw new NotFoundException("Mentor profile doesn't exist");
    }
    return this.mentorService.getDescription(mentorProfile.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mentorService.remove(+id);
  }

  @UseGuards(AuthGuard)
  @Post('/ratings')
  async createRating(@Body() dto: CreateRatingDto, @Req() req: AuthRequest) {
    const userId = req.user.id;
    const mentorProfile = await this.mentorService.findOne(dto.mentorId);

    if (!mentorProfile) {
      throw new NotFoundException("Mentor profile doesn't exist");
    }

    return this.mentorService.createRating(userId, dto);
  }
}
