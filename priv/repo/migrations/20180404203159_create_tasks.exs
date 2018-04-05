defmodule Tasktrack.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :act_time, :integer
      add :completed, :boolean, default: false, null: false
      add :desc, :text
      add :title, :string
      add :assignee_id, references(:users, on_delete: :nothing)
      add :requester_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:assignee_id])
    create index(:tasks, [:requester_id])
  end
end
