defmodule Tasktrack.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset


  schema "tasks" do
    field :act_time, :integer, default: 0, null: false
    field :completed, :boolean, default: false, null: false
    field :desc, :string, null: false
    field :title, :string, null: false
    belongs_to :assignee, Tasktrack.Users.User
    belongs_to :requester, Tasktrack.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:act_time, :completed, :desc, :title, :assignee_id, :requester_id])
    |> validate_required([:act_time, :completed, :desc, :title, :requester_id])
  end
end
