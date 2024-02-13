# Final group capstone - Book an Appointment

## Learning objectives

- Apply technical knowledge and skills gained in previous modules in a complex project.
- Understand pros and cons of different approaches of connecting Ruby on Rails back-end with React front-end.
- Understand principles of Ruby on Rails and React frameworks.
- Apply Ruby best practices and language style guides in code.
- Apply RoR best practices and language style guides in code (e.g. thin controllers).
- Apply JavaScript best practices and language style guides in code.
- Apply React best practices and language style guides in code.
- Learn about and practice giving constructive feedback to teammates.
- Perform a code review for a team member.
- Use the "Review change"" feature from GitHub.
- Write clear, professional, and respectful review comments for other team members.
- Explain "why" a change is requested when giving a code review.
- Plan a 2+ week project with no interim Microverse-set milestones and submit it on time.
- Apply knowledge of setting working agreements to set group project teams up for success.
- Independently implement best practices for group agreements to improve teamwork in larger group project.
- Demonstrate ability to apply best practices of communication for resolving teamwork challenges.
- Understand that respect is the foundation of strong relationship-building with teammates.
- Show up throughout group projects as a reliable and committed team member who communicates and manages your time effectively.
- Recognize the importance of investing in good working relationships with teammates.
- Understand principles of strong teamwork (being reliable, committed, and consistent) and how to apply them in group projects.
- Recognize the value of making equal contributions to group projects to produce the best outcome.
- Use empty Kanban board to manage tasks with team and own time on the project.

### Estimated time: 59.5h

## Description

The project you are going to build for the Final Capstone Project is based on an app to book an appointment to try a motorcycle. You should follow the given design of the website, but you must personalize the content, i.e., instead of booking an appointment to try a motorcycle, you can build an app to book an appointment with a doctor, or reserve an online class with a teacher. This is highly encouraged since having unique projects in your portfolio will help you stand out while looking for jobs.

**If your team is repeating the final capstone project, please use the second version of [these requirements](https://github.com/microverseinc/curriculum-final-capstone/blob/main/projects/buisness_requirements_2.md) and let your reviewers know about it.**

### How to build the "Book an Appointment" app

The result should look exactly the same (with exception for titles and images) as in [the design](https://www.behance.net/gallery/26425031/Vespa-Responsive-Redesign) provided by [Murat Korkmaz](https://www.behance.net/muratk) on Behance.

<p align="center">
  <img src="./images/vespa.png" alt="Vespa main page" />
</p>

The app will have some common interfaces, but depending on your team size it will have a couple of extra ones.

_IMPORTANT NOTE: Read **all** requirements before you start building your project._

### General requirements

- Make sure that there are [no linter errors](https://github.com/microverseinc/linters-config).
- Make sure that you used correct [Gitflow](https://github.com/microverseinc/curriculum-transversal-skills/blob/main/git-github/articles/gitflow.md).
- Make sure that you documented your work [in a professional way](https://github.com/microverseinc/curriculum-transversal-skills/blob/main/documentation/articles/professional_repo_rules.md).

### HTML/CSS, JavaScript, and Ruby requirements

- Follow our list of [best practices for HTML & CSS](https://github.com/microverseinc/curriculum-html-css/blob/main/articles/html_css_best_practices.md).
- Follow our list of [best practices for JavaScript](https://github.com/microverseinc/curriculum-html-css/blob/main/articles/javascript_best_practices.md).
- Follow our list of [best practices for Ruby](https://github.com/microverseinc/curriculum-ruby/blob/main/articles/ruby_best_practices.md).

### Project requirements

#### Basics

- You should follow the layout of [the provided design](https://www.behance.net/gallery/26425031/Vespa-Responsive-Redesign). You should change only the titles, descriptions, and photos - in order to create a website about something other than motorcycles.
- Select a theme for your website - is it going to be a website for booking doctor appointments, booking online classes, or something else?

#### Features

Depending on your team size you are required to complete a set number of features. Take inventory of your team and see where you fit in the following table:

| Team size | # of required features |
| --------- | ---------------------- |
| 1-2       | 6                      |
| 3-4       | 9                      |
| 5         | 11                     |

If your team has finished the required features, but you'd still like to complete more you are free to continue with the optional ones.

**Note: If your team decides to implement optional features, make sure they work as expected (just like the required ones). This will be considered in your final evaluation!**

##### Core features - Required for _every_ team size

1. The user logs in to the website, only by typing the username (a proper authenticated login is a requirement if your group is made of 5 people).
2. In the navigation panel, the user can see links to:
   - Cars that you selected as a theme.
   - "Reserve" form.
   - "My reservations".
   - "Add car".
   - "Delete car".
3. On the main page, the user can see a [list of car](https://www.behance.net/gallery/26425031/Vespa-Responsive-Redesign/modules/173005577).

4. When the user selects a specific item, they can see the [details page](https://www.behance.net/gallery/26425031/Vespa-Responsive-Redesign/modules/173005579) with its full description.

   - In the details page, the user can click the "Reserve" button.

5. When the user clicks the "Add car" link in the navigation panel they can see a form for adding a new item.

6. Make the app responsive, creating both mobile and desktop versions.

7. When the user clicks the "Delete car" link in the navigation panel they can see a list of all items with title and "Delete" button.
   - When the user clicks the "Delete" button, the selected item is marked as removed and does not show on the main list anymore.

- To reserve an appointment, the user has to select a date and city (username and selected item are autofilled).
  - Use the design based on the ["Book a vespa test-ride"](https://www.behance.net/gallery/26425031/Vespa-Responsive-Redesign/modules/173005583) and add all necessary inputs.
  - The user can also access the "Reserve" page from the navigation panel. In that case only username is autofilled.

8. When the user clicks the "My reservations" link in the navigation panel they can see a list of their reservations (with information about car name, date and city).
9. Add full documentation for your API.

10. Implement proper user authentication from the front-end to the server.
11. Make sure that the "Add item" and "Delete item" links are accessible only by users who are admins.

#### Technical set up

- Set up the repository/repositories on GitHub and use Gitflow.
- You should use Postgres as your database
- Use Rails to create backend API.
- Use React & Redux to create frontend UI.
- You can choose if you want to set up your project as two separate apps or as one.
- The [Creative Commons license of the design](https://creativecommons.org/licenses/by-nc/4.0/) requires that you give appropriate credit to the author. Therefore, you must do it in the README of your project.

#### Unexpected issues

In the case of some unexpected issues that can cause delay, you might need to compromise some features. Remember that if you implement at least 80% of the required features and provide a good explanation for the fact that some requirements are not met, your project will be accepted.

### Workload distribution

To tackle this challenge, you need to create a Kanban board with a GitHub project that translates the requirements into a set of tasks that you will be able to use to organize your work. You will create your board in a separate activity.

You will be working in this way:

- You need to translate the above requirements into Kanban cards.
- All tasks should have time estimates and your job is to distribute them between team members in a fair way.
- The common tasks will be divided among all of you or completed as a team (pair programming).
- All tasks should be based on the cards from your Kanban board.
- If you discover a new task that needs to be done, create a new card for it.

## Work and submission mode

- You should implement the above requirements only in **one repository** in your group.
- You should ask for a review and submit this activity **on behalf of your group.**

## Code review

You will give and receive code reviews from your teammates. Each task should have a separate pull request that is reviewed by one of your teammates.
Once the entire project is ready, one of your team members will request a code review on behalf of your group.
For both processes follow [these steps](https://github.com/microverseinc/curriculum-transversal-skills/blob/main/code-review/articles/code_review_flow_group_projects.md).

**If you developed your app in 2 repos:**

- submit a link to the pull request in your backend API repo
- include a link to the pull request in your frontend UI repo in the description of the submitted pull request.
  Thanks to that the code reviewer will be able to leave you hints for your entire code.

**IMPORTANT NOTE:** In this project, code reviews are not the final evaluation of your project. Their purpose is to help you to improve your project BEFORE your final presentation. Please use as many code reviews as you want to ensure that your project is ready for the presentation.

## Submit your project

You can submit your project at any point of the code review process. You do not need to wait for the code reviewer approval.
[Read this FAQ for a reminder on how to submit your project](https://microverse.zendesk.com/hc/en-us/articles/360061344234).

Now go to your Student Dashboard and submit your project.

---

_If you spot any bugs or issues in this activity, you can [open an issue with your proposed change](https://github.com/microverseinc/curriculum-transversal-skills/blob/main/git-github/articles/open_issue.md)._