import { UsersDataTable } from "./components/UsersDataTable";
import { useUserController } from "./useUserController";

export default function User() {
  const { users, user, isLoadingDelete, isLoading } = useUserController();

  return (
    <UsersDataTable
      users={users || []}
      isLoading={isLoadingDelete || isLoading}
      user={user!}
    />
  )
}
