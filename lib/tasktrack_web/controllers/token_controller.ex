#based on code from ntuck
#https://github.com/NatTuck/microblog-spa/tree/lec20-end

defmodule TasktrackWeb.TokenController do
  use TasktrackWeb, :controller
  alias Tasktrack.Users.User

  action_fallback TasktrackWeb.FallbackController

  def create(conn, %{"username" => username, "password" => password}) do
    IO.inspect("create")
    with {:ok, %User{} = user} <- Tasktrack.Users.get_and_auth_user(username, password) do
      IO.inspect(user)
      token = Phoenix.Token.sign(conn, "auth token", user.id)
      conn
      |> put_status(:created)
      |> render("token.json", user: user, token: token)
    end
  end
end
