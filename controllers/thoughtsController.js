const { User, Thought, Reaction } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought._id }},
                { new: true }
            )
            res.json(thought)})
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : Thought.deleteMany({ _id: { $in: thought.reactions } })
          )
          .then(() => res.json({ message: 'Thought and reactions deleted!' }))
          .catch((err) => res.status(500).json(err));
      },
      addReaction(req, res) {
        console.log('You are adding a reaction');
        Reaction.create(req.body)
          .then((reaction) => {
            Thought.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { reactions: reaction } },
                { new: true }
              ).then(res.json(reaction))
              .catch((err) => res.status(500).json(err));
          });
      },
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { _id: req.params._id } } },
          { new: true }
        )
          .then((reaction) => {
          Thought.deleteMany({ _id: { $in: reaction.Reaction } })
          .then(res.json(reaction))
          .catch((err) => res.status(500).json(err))
        });
      },
};