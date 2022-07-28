<template>
  <div
    class="view login"
    v-if="state.username === '' || state.username === null"
  >
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <h1>Login to Chat</h1>
        <label for="username">Username</label>
        <input type="text" placeholder="Username..." v-model="inputUsername" />
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>

  <div class="view chat" v-else>
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome {{ state.username }}</h1>
    </header>
    <section class="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="
          message.username == state.username
            ? 'message current-user'
            : 'message'
        "
      >
        <div class="message-inner">
          <div class="username">
            {{ message.username }}
          </div>
          <div class="content">
            {{ message.content }}
          </div>
        </div>
      </div>
    </section>
    <footer>
      <form @submit.prevent="SendMessage">
        <input type="text" v-model="inputMessage" />
        <input type="submit" value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

export default {
  name: "App",
  data() {
    return {
      inputUsername: "",
      inputMessage: "",
      state: {
        username: "",
        messages: [],
      },
    };
  },
  methods: {
    Login() {
      if (this.inputUsername != "" || this.inputUsername != null) {
        this.state.username = this.inputUsername;
        this.inputUsername = "";
      }
    },
    Logout() {
      this.state.username = "";
    },
    SendMessage() {
      const messagesReferance = firebase.database().ref("messages");
      if (this.inputMessage === "" || this.inputMessage === null) {
        return;
      }
      const message = {
        username: this.state.username,
        content: this.inputMessage,
      };
      messagesReferance.push(message);
      this.inputMessage = "";
    },
  },
  mounted() {
    const messagesReferance = firebase.database().ref("messages");
    messagesReferance.on("value", (snapshot) => {
      const data = snapshot.val();
      let msg = [];
      Object.keys(data).forEach((key) => {
        msg.push({
          id: key,
          username: data[key].username,
          content: data[key].content,
        });
        this.state.messages = msg;
      });
    });
  },
};
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #35495e;

  &.login {
    align-items: center;
    .login-form {
      display: block;
      width: 100%;
      padding: 15px;

      .form-inner {
        display: block;
        background-color: #364a5f;
        padding: 50px 15px;
        border-radius: 16px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
        h1 {
          color: #42b883;
          font-size: 28px;
          margin-bottom: 30px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          color: #42b883;
          font-size: 16px;
          transition: 0.4s;
        }
        input[type="text"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;

          color: #42b883;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #465f79;
          transition: 0.4s;
          &::placeholder {
            color: #42b883;
            transition: 0.4s;
          }
        }
        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          background-color: #42b883;
          border-radius: 8px;
          color: #35495e;
          font-size: 18px;
          font-weight: 700;
        }
        &:focus-within {
          label {
            color: #46c48b;
          }
          input[type="text"] {
            background-color: #35495e;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
            &::placeholder {
              color: #666;
            }
          }
        }
      }
    }
  }
  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 50px 30px 10px;
      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;
        color: #42b883;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: #42b883;
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #2d3b49;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #42b883;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #324252;
            border-radius: 999px;
            color: #42b883;
            font-size: 18px;
            font-weight: 500;
            line-height: 1.2em;
            text-align: left;
          }
        }
        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;
          .message-inner {
            max-width: 75%;
            .content {
              color: #42b883;
              font-weight: 600;
              font-weight: 500;
              background-color: #49627e;
            }
          }
        }
      }
    }
    footer {
      position: sticky;
      bottom: 0px;
      background-color: #4c5f74;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #42b883;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #3c4857;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background-color: #42b883;
          color: #35495e;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
