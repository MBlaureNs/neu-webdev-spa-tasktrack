# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktrack.Repo.insert!(%Tasktrack.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule Seeds do
  alias Tasktrack.Repo
  alias Tasktrack.Users.User
  alias Tasktrack.Tasks.Task

  def run do
    pa = Comeonin.Argon2.hashpwsalt("password1alice")
    pb = Comeonin.Argon2.hashpwsalt("password1bob")

    Repo.delete_all(User)
    ua = Repo.insert!(%User{ username: "alice", password_hash: pa})
    ub = Repo.insert!(%User{ username: "bob", password_hash: pb})

    Repo.delete_all(Task)
    Repo.insert!(%Task{
	  title: "task1",
	  desc: "task1-desc",
	  act_time: 30,
	  completed: true,
	  requester_id: ua.id,
	  assignee_id: ub.id})
    Repo.insert!(%Task{
	  title: "task2",
	  desc: "task2-desc",
	  act_time: 60,
	  completed: false,
	  requester_id: ub.id,
	  assignee_id: ub.id})
  end
end

Seeds.run
