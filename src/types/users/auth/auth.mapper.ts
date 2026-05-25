import { LoginResponse } from "./auth.types";
import { User, UserResponseDto } from "../users/user.types";

// mapper user
export const mapUser = (dto: UserResponseDto): User => ({
  ...dto
});

// mapper login
export const mapLoginResponse = (dto: LoginResponse) => ({
  token: dto.token,
  user: mapUser(dto.user),
});