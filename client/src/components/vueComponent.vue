<template>

<div class="container">

    <h1>Min Vue sida</h1>
    <hr>
    <p class="error" v-if="error">{{error}}</p>
    

      
    <!--Create new Post DIV -->
    <transition name="modal-fade">
    <div class="modal-backdrop" v-show="isInputVisible" @close="closeInput">
    <div class="modal">
    <div class="create-post">
    <label id="inputLabel" for="create-post">Lägg till en rolig historia</label>     
    <input type="text" id="create-post" v-model="name" placeholder="Your name">
    <input type="text" id="create-post" v-model="title" placeholder="Title">
    <input type="text" id="create-post" v-model="text" placeholder="Text">
    <hr>
    <button v-on:click="createPost">POST</button>
    <button type="button" @click="closeInput">CLOSE</button>
   </div>
   </div>
   </div>
   </transition>


    <!--Button opening DIV for creating a new post -->
    <button type="button" class="link" @click="showInput">Ny historia</button>
    <hr>

    <!--DIV for editing posts -->
    <transition name="modal-fade">
    <div class="modal-backdrop" v-show="isModalVisible" @close="closeModal">
    <div class="modal" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h1 class="modal-title">Redigera inlägg</h1>
    </div>
    <!--
    //Possibility to show post while editing
    <div class="modal-body">
    <p>Namn: {{ name }}</p>
    <p>Title: {{ title }}</p>
    <p>Text: {{ text }}</p>
    </div>
    -->
    <div>
    <label for="update-name">NAMN:</label>
    <input type="text" id="update-name" v-model="name" placeholder="Your name">
    <label for="update-title">TITLE:</label>
    <input type="text" id="update-title" v-model="title" placeholder="Title">
    <label for="update-text">TEXT:</label>
    <input type="text" id="update-text" v-model="text" placeholder="Text">
    <hr>
    <button v-on:click="updatePost(_id)">UPDATE POST</button>
    </div>
    <div class="modal-footer">
    <button type="button"  v-on:click="deletePost(_id)">DELETE</button>
    <button type="button" @click="closeModal">CLOSE</button>
    </div>
    </div>
    </div>
    </div>
    </transition>

  <!-- DIV showing posts -->
  <div class="postDiv" v-for="post in posts" v-bind:item="post" v-bind:key="post._id">
    <p id="p-title">{{ post.title }}</p>
    <p id="p-name">{{ post.name }}</p> 
    {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getYear()}`}} 
    <p id="p-text">{{ post.text }}</p>   
    <!--open modal button opens DIV for editing posts -->
    <button type="button" @click="showModal(post)">REDIGERA</button>
  </div><!-- end of DIV showing posts--> 

 
</div><!-- end of DIV container--> 

</template>


<script>

//import PostService and modal
import PostService from '../PostService';

//Export vueComponent
export default{
    name:'vueComponent',
   //data       
 data(){
   return{
     isModalVisible: false,
     isInputVisible: false,
     posts:[],
     error: '',
     name: '' ,
     title:'' ,
     text:''
  
   }
 },
  //Get Posts
 async created(){
   try{
this.posts=await PostService.getPosts();
   }catch(err){
     this.error=err.message;
   }
 },
  methods:{    
       showModal(post) {
          this.name=post.name;
          this.title=post.title;
          this.text=post.text;
          this._id=post._id;
        this.isModalVisible = true;
        
      },
       showInput() {
        this.isInputVisible = true;
        
      },
      closeModal() {
        this.isModalVisible = false;
      },
      closeInput() {
        this.isInputVisible = false;
      },
        //Create Post
   async createPost(){
     await PostService.insertPost(this.name, this.title, this.text);
     this.isInputVisible = false;
     this.posts= await PostService.getPosts();
     
   },
    //Delete Post
   async deletePost(id){
     await PostService.deletePost(id);
     this.posts= await PostService.getPosts();
     this.isModalVisible = false;
   },
    //Update post
   async updatePost(id){
     await PostService.updatePost(id,this.name, this.title, this.text);
     this.isModalVisible = false;
     this.posts= await PostService.getPosts();
   }
     
  }
}
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    padding:20px;
  }

   .create-post {
    position: relative;
    padding: 30px 20px;
  }

  #inputLabel{
      padding:10px;
  }

  input{
      margin:10px;
      padding:5px;
  }
  button{
  background-color: white;
  color: black;
  border: 2px solid #555555;
  padding: 14px 30px;
  width:170px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-family: 'Poiret One', cursive;
  font-weight:bold;
  margin: 4px 2px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  }

  button:hover {
  background-color: #555555;
  color: white;
}

.link{
border: none;
outline:none;
width:300px;
text-transform:uppercase;
font-weight:bold;
font-size:1.6em;
}

.link:hover{
    text-decoration: underline;
    background-color: white;
    color:black;
}

#p-text{
    padding-left:20%;
    padding-right:20%;
    font-family: 'Nunito', sans-serif;
    
}

.postDiv{
    text-align:center;
}
#p-name{
    font-family: 'Dancing Script', cursive;
    font-size:1.8em;
}
#p-title{
    font-family: 'Poiret One', cursive;
   font-weight:bold;
   padding-left:20%;
    padding-right:20%;
    font-size:1.9em;
    margin-top:2em;
}

h1{
   font-family: 'Poiret One', cursive; 
   font-weight:bold;
   font-size:2.5em;
}

.container{
    padding-bottom:5em;
}

</style>