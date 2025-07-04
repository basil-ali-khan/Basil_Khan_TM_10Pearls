USE [master]
GO
/****** Object:  Database [TaskDB]    Script Date: 6/29/2025 10:19:46 PM ******/
CREATE DATABASE [TaskDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'TaskDB', FILENAME = N'/var/opt/mssql/data/TaskDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'TaskDB_log', FILENAME = N'/var/opt/mssql/data/TaskDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [TaskDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [TaskDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [TaskDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [TaskDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [TaskDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [TaskDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [TaskDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [TaskDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [TaskDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [TaskDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [TaskDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [TaskDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [TaskDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [TaskDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [TaskDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [TaskDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [TaskDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [TaskDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [TaskDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [TaskDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [TaskDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [TaskDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [TaskDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [TaskDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [TaskDB] SET RECOVERY FULL 
GO
ALTER DATABASE [TaskDB] SET  MULTI_USER 
GO
ALTER DATABASE [TaskDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [TaskDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [TaskDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [TaskDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [TaskDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [TaskDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'TaskDB', N'ON'
GO
ALTER DATABASE [TaskDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [TaskDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [TaskDB]
GO
/****** Object:  Table [dbo].[Tasks]    Script Date: 6/29/2025 10:19:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tasks](
	[TaskID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](255) NOT NULL,
	[Description] [ntext] NULL,
	[Status] [nvarchar](20) NOT NULL,
	[Priority] [nvarchar](20) NULL,
	[UserID] [int] NOT NULL,
	[CreatedAt] [datetime2](7) NULL,
	[UpdatedAt] [datetime2](7) NULL,
	[DueDate] [datetime2](7) NULL,
	[CompletedAt] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[TaskID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 6/29/2025 10:19:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](255) NOT NULL,
	[PasswordHash] [nvarchar](255) NOT NULL,
	[UserType] [nvarchar](20) NOT NULL,
	[FirstName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NULL,
	[CreatedAt] [datetime2](7) NULL,
	[UpdatedAt] [datetime2](7) NULL,
	[IsActive] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Tasks] ON 

INSERT [dbo].[Tasks] ([TaskID], [Title], [Description], [Status], [Priority], [UserID], [CreatedAt], [UpdatedAt], [DueDate], [CompletedAt]) VALUES (1, N'Buy groceries', N'Need to buy milk, bread, and eggs.', N'todo', N'high', 2, CAST(N'2025-06-29T08:08:34.9700000' AS DateTime2), CAST(N'2025-06-29T08:08:34.9700000' AS DateTime2), CAST(N'2025-07-01T00:00:00.0000000' AS DateTime2), NULL)
INSERT [dbo].[Tasks] ([TaskID], [Title], [Description], [Status], [Priority], [UserID], [CreatedAt], [UpdatedAt], [DueDate], [CompletedAt]) VALUES (2, N'Finish project report', N'Complete the final draft of the TPS task manager.', N'inProgress', N'medium', 2, CAST(N'2025-06-29T08:08:34.9700000' AS DateTime2), CAST(N'2025-06-29T08:08:34.9700000' AS DateTime2), CAST(N'2025-07-05T00:00:00.0000000' AS DateTime2), NULL)
INSERT [dbo].[Tasks] ([TaskID], [Title], [Description], [Status], [Priority], [UserID], [CreatedAt], [UpdatedAt], [DueDate], [CompletedAt]) VALUES (3, N'Book dentist appointment', N'Schedule appointment with Dr. Ayesha.', N'todo', N'low', 3, CAST(N'2025-06-29T08:08:34.9966667' AS DateTime2), CAST(N'2025-06-29T08:08:34.9966667' AS DateTime2), CAST(N'2025-07-10T00:00:00.0000000' AS DateTime2), NULL)
INSERT [dbo].[Tasks] ([TaskID], [Title], [Description], [Status], [Priority], [UserID], [CreatedAt], [UpdatedAt], [DueDate], [CompletedAt]) VALUES (4, N'Workout', N'Go for a 30-minute run.', N'done', N'medium', 3, CAST(N'2025-06-29T08:08:34.9966667' AS DateTime2), CAST(N'2025-06-29T08:08:34.9966667' AS DateTime2), CAST(N'2025-06-28T00:00:00.0000000' AS DateTime2), NULL)
SET IDENTITY_INSERT [dbo].[Tasks] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [Email], [PasswordHash], [UserType], [FirstName], [LastName], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (1, N'admin@example.com', N'hashed_password_admin', N'admin', N'Admin', N'User', CAST(N'2025-06-29T08:08:08.4600000' AS DateTime2), CAST(N'2025-06-29T08:08:08.4600000' AS DateTime2), 1)
INSERT [dbo].[Users] ([UserID], [Email], [PasswordHash], [UserType], [FirstName], [LastName], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (2, N'alice@example.com', N'hashed_password_alice', N'user', N'Alice', N'Johnson', CAST(N'2025-06-29T08:08:08.4700000' AS DateTime2), CAST(N'2025-06-29T08:08:08.4700000' AS DateTime2), 1)
INSERT [dbo].[Users] ([UserID], [Email], [PasswordHash], [UserType], [FirstName], [LastName], [CreatedAt], [UpdatedAt], [IsActive]) VALUES (3, N'bob@example.com', N'hashed_password_bob', N'user', N'Bob', N'Smith', CAST(N'2025-06-29T08:08:08.4700000' AS DateTime2), CAST(N'2025-06-29T08:08:08.4700000' AS DateTime2), 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Users__A9D105349AA3687C]    Script Date: 6/29/2025 10:19:47 PM ******/
ALTER TABLE [dbo].[Users] ADD UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Tasks] ADD  DEFAULT ('todo') FOR [Status]
GO
ALTER TABLE [dbo].[Tasks] ADD  DEFAULT ('medium') FOR [Priority]
GO
ALTER TABLE [dbo].[Tasks] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Tasks] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ('user') FOR [UserType]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((1)) FOR [IsActive]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [FK_Tasks_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [FK_Tasks_Users]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [CHK_TaskPriority_Valid] CHECK  (([Priority]='high' OR [Priority]='medium' OR [Priority]='low'))
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [CHK_TaskPriority_Valid]
GO
ALTER TABLE [dbo].[Tasks]  WITH CHECK ADD  CONSTRAINT [CHK_TaskStatus_Valid] CHECK  (([Status]='done' OR [Status]='inProgress' OR [Status]='todo'))
GO
ALTER TABLE [dbo].[Tasks] CHECK CONSTRAINT [CHK_TaskStatus_Valid]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [CHK_UserType_Valid] CHECK  (([UserType]='admin' OR [UserType]='user'))
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [CHK_UserType_Valid]
GO
USE [master]
GO
ALTER DATABASE [TaskDB] SET  READ_WRITE 
GO
