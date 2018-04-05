#based on code from ntuck
#https://github.com/NatTuck/microblog-spa/tree/lec20-end
#http://www.ccs.neu.edu/home/ntuck/courses/2018/01/cs4550/notes/20-redux/notes.html

defmodule TasktrackWeb.TokenView do
  use TasktrackWeb, :view

  def render("token.json", %{user: user, token: token}) do
    %{
      user_id: user.id,
      user_username: user.username,
      token: token,
    }
  end
end
