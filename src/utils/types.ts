export type User = {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
};

export type UserProfile = {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ErrorType = {
  message: string;
  errorCode: ErrorCode;
  statusCode?: number;
  errors: ErrorObjectType;
};

export type ErrorObjectType = {
  name?: string;
  code?: string;
};

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USERID_NOT_FOUND = 1002,
  USER_ALREADY_EXISTS = 1003,
  INCORRECT_PASSWORD = 1004,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  NO_SERVER_FOUND = 4001,
}

export type ServerType = {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
  channels?: ChannelType[];
  members?: MemberType[];
};
export type ServerWithMembersWithProfiles = {
  id: string;
  name: string;
  imageUrl: string;
  inviteCode: string;
  profileId: string;
  createdAt: string;
  updatedAt: string;
  channels: ChannelType[];
  members: MemberType[];
};

export type TokenType = () => Promise<string | null>;

export enum ChannelModeType {
  TEXT = "TEXT",
  AUDIO = "AUDIO",
  VIDEO = "VIDEO",
}

export type ChannelType = {
  createdAt: string;
  id: string;
  name: string;
  profileId: string;
  serverId: string;
  type: ChannelModeType;
  updatedAt: string;
};

export type MemberType = {
  id: string;
  profile: UserProfile;
  profileId: string;
  role: MemberRole;
  serverId: string;
  createdAt: string;
  updatedAt: string;
};

export enum MemberRole {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  GUEST = "GUEST",
}
