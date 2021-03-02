const rules = {
    visitor: {
      static: ["events:list", "home-page:visit"]
    },
    user: {
      static: [
        "events:list",
        "events:create",
        "users:getSelf",
        "home-page:visit",
        "dashboard-page:visit",
        "profile-page:visit"
      ],
      dynamic: [{
        "events:edit": ({userId, eventOwnerId}) => {
          if (!userId || !eventOwnerId) return false;
          return userId === eventOwnerId;
        },
        "ideas:edit": ({userId, ideaOwnerId}) => {
          if (!userId || !ideaOwnerId) return false;
          return userId === ideaOwnerId;
        }
      }]
    },
    admin: {
      static: [
        "events:list",
        "events:create",
        "events:edit",
        "events:delete",
        "ideas:list",
        "ideas:create",
        "ideas:edit",
        "ideas:delete",
        "users:get",
        "users:getSelf",
        "home-page:visit",
        "dashboard-page:visit",
        "profile-page:visit"
      ]
    }
  };
  
  export default rules;