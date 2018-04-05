defmodule Tasktrack.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :act_time, :integer, default: 0, null: false
      add :completed, :boolean, default: false, null: false
      add :desc, :text
      add :title, :string, null: false
      add :assignee_id, references(:users, on_delete: :nilify_all)
      add :requester_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:tasks, [:assignee_id])
    create index(:tasks, [:requester_id])
  end
end
