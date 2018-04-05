defmodule Tasktrack.Users.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :password_hash, :string, null: false
    field :username, :string, null: false
    field :password, :string, virtual: true
    
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:username, :password, :password_hash])
    |> validate_required([:username, :password_hash])
    |> unique_constraint(:username)
  end
end
