import { Probot } from "probot";

export = (app: Probot) => {
  app.on("issues.opened", async (context) => {
    const issueComment = context.issue({
      body: "Thanks for opening this issue!"
    });
    await context.octokit.issues.createComment(issueComment);
  });

  app.on("pull_request.opened", async (context) => {
    const pr = context.payload.pull_request;
    const repo = context.repo();

    // You can customize the comment message here
    const comment = `Thanks for opening this pull request, @${pr.user.login}! :tada:`;

    // Add your comment to the pull request
    await context.octokit.issues.createComment({
      ...repo,
      issue_number: pr.number,
      body: comment
    });
  });

  app.on("pull_request.closed", async (context) => {
    const pr = context.payload.pull_request;
    const repo = context.repo();

    // You can customize the comment message here
    const comment = `This pull request was closed by @${pr.user.login}.`;

    // Add your comment to the pull request
    await context.octokit.issues.createComment({
      ...repo,
      issue_number: pr.number,
      body: comment
    });
  });

  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
};
