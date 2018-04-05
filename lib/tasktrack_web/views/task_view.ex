defmodule TasktrackWeb.TaskView do
  use TasktrackWeb, :view
  alias TasktrackWeb.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      act_time: task.act_time,
      completed: task.completed,
      desc: task.desc,
      title: task.title}
  end
end
