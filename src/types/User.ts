export interface User {
  readonly id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  readonly is_staff: boolean;
  readonly is_superuser: boolean;
  readonly date_joined: string;
  readonly is_active: boolean;
  readonly favorites: number[]; //Pet ids
}
