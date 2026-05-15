DROP TABLE users;

CREATE TABLE [dbo].[users] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [names]       NVARCHAR (100) CONSTRAINT [DEFAULT_users_names] DEFAULT 'no_names' NOT NULL,
    [surnames]    NVARCHAR (100) CONSTRAINT [DEFAULT_users_surnames] DEFAULT 'no_surnames' NOT NULL,
    [email]       NVARCHAR (255) CONSTRAINT [DEFAULT_users_email] DEFAULT 'no_email' NOT NULL,
    [description] NVARCHAR (255) CONSTRAINT [DEFAULT_users_description] DEFAULT 'no_description' NOT NULL,
    [password]    NVARCHAR (255)  CONSTRAINT [DEFAULT_users_password] DEFAULT '0192837465' NOT NULL,
    [phonenumber] VARCHAR (20)   CONSTRAINT [DEFAULT_users_phonenumber] DEFAULT '0000-0000' NOT NULL,
    [dui]         VARCHAR (10)   CONSTRAINT [DEFAULT_users_dui] DEFAULT '000000000' NOT NULL,
    [rol]         NVARCHAR (20)  CONSTRAINT [DEFAULT_users_role] DEFAULT 'albañil' NOT NULL,
    [degrees]     VARCHAR (255)  NOT NULL,
    [picture]     VARCHAR (255)  NOT NULL,
    [birthdate]   DATE           CONSTRAINT [DEFAULT_users_birthdate] DEFAULT '01-01-1970' NOT NULL,
    [created_at]  DATETIME       CONSTRAINT [DEFAULT_users_created_at] DEFAULT GETDATE() NOT NULL,
    [updated_at]  DATETIME       CONSTRAINT [DEFAULT_users_updated_at] DEFAULT GETDATE() NOT NULL,
    [status]      VARCHAR (50)   CONSTRAINT [DEFAULT_users_status] DEFAULT 'active' NOT NULL,
    CONSTRAINT [PK_users] PRIMARY KEY CLUSTERED ([Id] ASC)
);