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
      title: task.title,
      assignee_id: task.assignee_id,
      assignee_name: if is_nil(task.assignee_id) do "None" else task.assignee.username end,
      requester_id: task.requester_id,
      requester_name: task.requester.username
    }
  end
end
