const contractAddress = '0x1542422b513C6E75e1bFb6F01e3bfe45b5B65019';

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "name": "Post_create",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "bio",
                "type": "string"
            }
        ],
        "name": "Profile_create",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "posts",
        "outputs": [
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "Posts_get",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "author",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "content",
                        "type": "string"
                    }
                ],
                "internalType": "struct SocialMedia.Post[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "profiles",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "bio",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let provider;
let signer;
let contract;

async function connect() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);
            
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            
            alert('Wallet connected');
        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet');
        }
    } else {
        alert('No wallet found');
    }
}

async function createProfile() {
    const name = document.getElementById('profileName').value;
    const bio = document.getElementById('profileBio').value;

    try {
        const result = await contract.Profile_create(name, bio);
        console.log('Profile creation transaction result:', result);
        alert('Profile created successfully!');
    } catch (error) {
        console.error('Error creating profile:', error);
        alert('Error creating profile. Check console for details.');
    }
}

async function createPost() {
    const content = document.getElementById('postContent').value;

    try {
        await contract.Post_create(content);
        alert('Post created successfully!');
        console.log('Post created successfully:', content);

        await fetchPosts(); // Fetch and display posts after creation
    } catch (error) {
        console.error('Error creating post:', error);
        alert('Error creating post. Check console for details.');
    }
}

async function fetchPosts() {
    try {
        const posts = await contract.Posts_get();
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        alert('Error fetching posts. Check console for details.');
    }
}

function displayPosts(posts) {
    const postsElement = document.getElementById('postList');
    postsElement.innerHTML = ''; // Clear previous posts

    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>Author:</strong> ${post.author}<br><strong>Content:</strong> ${post.content}<br><br>`;
        postsElement.appendChild(li);
    });
}

// Example event listener for connecting wallet
document.getElementById('connectWallet').addEventListener('click', connect);

// Example event listener for creating profile
document.getElementById('profileForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    await createProfile();
});

// Example event listener for creating post
document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    await createPost();
});
