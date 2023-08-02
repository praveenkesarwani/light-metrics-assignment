# Comment System Web Application

This is a Comment System Web Application backend built using Node.js with Express. The application allows users to post comments and reply to existing comments, creating a hierarchical comment structure.

## Functional Requirements

- Users can view the list of comments with their hierarchical structure.
- Users can add new comments by submitting the comment form.
- Users can reply to existing comments, creating a parent-child relationship between comments.
- Users can edit their own comments.
- Users can delete their own comments.
- The application should persist comments and their hierarchy in a PostgreSQL database.

## Setup Instructions

1. Clone the repository to your local machine.
2. Install the required dependencies using npm or yarn.
3. Set up a PostgreSQL database and provide the necessary credentials and connection details in the backend's configuration file.
4. Start the Node.js backend using the `npm start` command and access it on `http://localhost:8000`.

## API Endpoints

- `GET /comments`: Get all comments with their hierarchical structure.
- `GET /comments/:id`: Get a single comment by its ID.
- `POST /comments`: Add a new comment. Request body should contain the `name`, `comment`, and optional `parent_id` for creating a reply.
- `PUT /comments/:id`: Update an existing comment by its ID. Request body should contain the updated `name` and `comment`.
- `DELETE /comments/:id`: Delete a comment by its ID.
