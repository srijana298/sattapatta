# ER Diagram for SattaPatta Application

The following ER diagram represents the data model of the SattaPatta application based on TypeORM entities.

```mermaid
erDiagram
    Users {
        int id PK
        string fullname
        string email
        string role
        string password
    }
    
    Mentor {
        int id PK
        string countryOfBirth
        string profilePhotoUrl
        text introduction
        text experience
        text motivation
        string headline
        boolean has_education
        boolean has_certificate
        decimal hourly_rate
        decimal trial_rate
        boolean isVerified
        boolean isActive
        string status
        date createdAt
        date updatedAt
    }
    
    MentorEducation {
        int id PK
        string university
        string degree
        string degree_type
        string start_year
        string end_year
    }
    
    MentorCertificate {
        int id PK
        string subject
        string name
        text description
        string issuedBy
        string start_year
        string end_year
        boolean certificateVerified
        string certificateFileUrl
    }
    
    MentorReview {
        int id PK
        int rating
        text comment
        text reply
        date repliedAt
        date createdAt
        date updatedAt
    }
    
    MentorAvailability {
        int id PK
        string day_of_week
        string start_time
        string end_time
        boolean is_available
    }
    
    Category {
        int id PK
        string name
        string description
        date createdAt
        date updatedAt
    }
    
    Skill {
        int id PK
        string name
        string description
        date createdAt
        date updatedAt
    }
    
    Booking {
        int id PK
        string start_date
        string end_time
        string status
        date createdAt
        date updatedAt
    }
    
    Conversation {
        int id PK
        date created_at
        date updated_at
    }
    
    ConversationParticipant {
        int id PK
    }
    
    Message {
        int id PK
        text content
        boolean is_unread
        date created_at
        date updated_at
    }
    
    Users ||--o{ Booking : "mentorBookings"
    Users ||--o{ Booking : "menteeBookings"
    Users ||--|| Mentor : "mentor_profile"
    Users ||--o{ ConversationParticipant : "participatedConversations"
    
    Mentor ||--o{ MentorEducation : "educations"
    Mentor ||--o{ MentorCertificate : "certificates"
    Mentor ||--o{ MentorReview : "reviews"
    Mentor }o--|| Category : "skill_category"
    Mentor }o--|| Skill : "skills"
    
    MentorReview }o--|| Users : "reviewer"
    
    Category ||--o{ Skill : "skills"
    Category ||--o{ Mentor : "mentors"
    
    Conversation ||--o{ ConversationParticipant : "participants"
    Conversation ||--o{ Message : "messages"
    
    ConversationParticipant }o--|| Users : "user"
    ConversationParticipant ||--o{ Message : "messages"
    
    Message }o--|| Conversation : "conversation"
    Message }o--|| ConversationParticipant : "participant"
```

## Entity Relationships Explanation

1. **Users**
   - One User can have one Mentor profile (OneToOne)
   - One User can have many Bookings as a mentor (OneToMany)
   - One User can have many Bookings as a mentee (OneToMany)
   - One User can participate in many Conversations (OneToMany to ConversationParticipant)

2. **Mentor**
   - One Mentor belongs to one User (OneToOne)
   - One Mentor can have many Education records (OneToMany)
   - One Mentor can have many Certificate records (OneToMany)
   - One Mentor can have many Reviews (OneToMany)
   - One Mentor belongs to one Category (ManyToOne)
   - One Mentor can have many Skills (ManyToOne/ManyToMany)

3. **Category**
   - One Category can have many Skills (OneToMany)
   - One Category can have many Mentors (OneToMany)

4. **Skill**
   - One Skill belongs to one Category (ManyToOne)
   - One Skill can be associated with many Mentors (ManyToMany)

5. **Booking**
   - One Booking has one mentor User (ManyToOne)
   - One Booking has one mentee User (ManyToOne)

6. **Conversation System**
   - One Conversation has many Participants (OneToMany)
   - One Conversation has many Messages (OneToMany)
   - One Participant belongs to one User (ManyToOne)
   - One Participant belongs to one Conversation (ManyToOne)
   - One Participant can have many Messages (OneToMany)
   - One Message belongs to one Conversation (ManyToOne)
   - One Message belongs to one Participant (ManyToOne)