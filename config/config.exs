# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tasktrack,
  ecto_repos: [Tasktrack.Repo]

# Configures the endpoint
config :tasktrack, TasktrackWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "w+7Z6aIrrbmitE7CPlqdAfLFyFxYR/XOxhrc5Dj/PdW2dk4Mv+gss2q78v8pRbys",
  render_errors: [view: TasktrackWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Tasktrack.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
