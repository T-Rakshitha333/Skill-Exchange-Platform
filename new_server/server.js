import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;

const usersData = [
    {
        id: 8,
        name: 'Aakash Sharma',
        email: 'akashsharma@example.com',
        skills: ['Python, Django, Flask'],
        interests: ['AI, Machine Learning, Cricket'],
        profileImage: 'https://picsum.photos/207/300',
      },
      
      {
        id: 9,
        name: 'Sekhar Reddy',
        email: 'sekharreddy@example.com',
        skills: ['JavaScript, React, Node.js'],
        interests: ['Web Development, Travel, Photography'],
        profileImage: 'https://picsum.photos/208/300',
      },
      
      {
        id: 10,
        name: 'Lokesh Kumar',
        email: 'lokeshkumar@example.com',
        skills: ['Java, Spring Boot, Hibernate'],
        interests: 'Software Architecture, Reading, Soccer',
        profileImage: 'https://picsum.photos/209/300',
      },
      
      {
        id: 11,
        name: 'Avinash Singh',
        email: 'avinashsingh@example.com',
        skills: ['C++, Data Structures, Algorithms'],
        interests: ['Competitive Programming, Science Fiction, Gaming'],
        profileImage: 'https://picsum.photos/210/300',
      },
      
      {
        id: 12,
        name: 'Hemanth Kumar',
        email: 'hemanthkumar@example.com',
        skills: ['Angular, TypeScript, MongoDB'],
        interests: ['UI/UX Design, Cycling, Music'],
        profileImage: 'https://picsum.photos/211/300',
      },
      
      {
        id: 13,
        name: 'Rakesh Patel',
        email: 'rakeshpatel@example.com',
        skills: ['PHP, Laravel, MySQL'],
        interests: ['Entrepreneurship, Movies, Cooking'],
        profileImage: 'https://picsum.photos/212/300',
      },
      
      {
        id: 14,
        name: 'Guru Prasad',
        email: 'guruprasad@example.com',
        skills: ['DevOps, Docker, Kubernetes'],
        interests: ['Open Source, Traveling, Coffee'],
        profileImage: 'https://picsum.photos/213/300',
      },
      {
        id: 15,
        name: 'Nithin Kumar',
        email: 'nithinkumar@example.com',
        skills: ['Java', 'Spring', 'React'],
        interests: ['Software Development', 'Reading', 'Football'],
        profileImage: 'https://picsum.photos/214/300',
      },
      
      {
        id: 16,
        name: 'Rajesh Patel',
        email: 'rajeshpatel@example.com',
        skills: ['Python', 'Django', 'Vue.js'],
        interests: ['Web Development', 'Travel', 'Movies'],
        profileImage: 'https://picsum.photos/215/300',
      },
      
      {
        id: 17,
        name: 'Sumanth Reddy',
        email: 'sumanthreddy@example.com',
        skills: ['JavaScript', 'Node.js', 'Express'],
        interests: ['Full Stack Development', 'Gaming', 'Cycling'],
        profileImage: 'https://picsum.photos/216/300',
      },
      
      {
        id: 18,
        name: 'Dileep Sharma',
        email: 'dileepsharma@example.com',
        skills: ['Ruby', 'Rails', 'React'],
        interests: ['Programming', 'Cooking', 'Photography'],
        profileImage: 'https://picsum.photos/217/300',
      },
      {
        id: 19,
        name: 'Vijay',
        email: 'Vijay@example.com',
        skills: ['rock', 'paper', 'Scissor'],
        interests: ['eat', 'Sleep', 'Travel'],
        profileImage: 'https://picsum.photos/218/300',
      },
    
];

app.use(cors());

// Endpoint to get all users
app.get("/users", (req, res) => {
  res.json(usersData);
});

// Endpoint to get a specific user by ID
app.get("/users/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = usersData.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    // User not found, return 404
    res.status(404).json({ error: 'User not found' });
  }
});

// Add this route to handle connection requests
app.post("/connect/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  // Implement your connection logic here
  // For now, let's just send a success response
  res.json({ message: `Connected with user ${userId}` });
});


app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'default-src *');
  next();
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

