import express from 'express';
const router = express.Router();

router.get("/interview-prep", (req, res) => {
  const interviewData = [
    {
      category: "Data Structures & Algorithms",
      description: "The absolute core of any software engineering technical interview. Mastering these topics is essential for problem-solving.",
      playlistId: "PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
      topics: [
        { name: "Arrays & Strings", details: "Understand contiguous memory, traversal, and manipulation techniques." },
        { name: "Linked Lists", details: "Grasp pointers, nodes, and the trade-offs versus arrays." },
        { name: "Stacks & Queues", details: "Learn LIFO and FIFO principles, essential for many algorithms." },
        { name: "Trees & Graphs", details: "Explore non-linear data storage, traversal algorithms (BFS, DFS), and complex problem modeling." },
        { name: "Dynamic Programming", details: "Master the art of breaking down complex problems into simpler, overlapping subproblems." },
      ]
    },
    {
      category: "System Design",
      description: "For mid-to-senior roles, you'll be asked to design large-scale systems. Focus on trade-offs and justifications for your choices.",
      playlistId: "PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX",
      topics: [
        { name: "Scalability Concepts", details: "Discuss vertical vs. horizontal scaling and when to use each." },
        { name: "Load Balancing & Caching", details: "Explain how to distribute traffic and store frequently accessed data to reduce latency." },
        { name: "Database Design", details: "Compare SQL and NoSQL databases and design schemas for different applications." },
        { name: "API Design", details: "Understand the principles of RESTful APIs and modern alternatives like GraphQL." },
      ]
    },
    {
      category: "Behavioral Questions",
      description: "It’s not just about what you know, but how you work. Prepare stories using the STAR method (Situation, Task, Action, Result).",
      videoId: "K4mDzReyT6g",
      topics: [
        { name: "Teamwork & Conflict", details: "Prepare an example of a disagreement with a team member and how you resolved it constructively." },
        { name: "Failure & Learning", details: "Be ready to discuss a project or task that failed, and more importantly, what you learned from it." },
        { name: "Leadership & Initiative", details: "Have a story about a time you took ownership of a project or mentored a teammate, even without an official title." },
        { name: "Motivation & Values", details: "Be able to clearly articulate why you are interested in this specific company and role." },
      ]
    }
  ];
  res.json(interviewData);
});

export default router;