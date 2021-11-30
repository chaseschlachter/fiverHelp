// here is the function I need help with
// the query starting on line 12 needs to return two values: 1) totalGuests & 2) attendedGuests 
// the valuables should come back and be held in variables outside the query so I can display those on the client

module.exports.showEvent = async(req, res,) => {
    const event = await Event.findById(req.params.id).populate('artist');
    if (!event) {
        req.flash('error', 'Cannot find that Event');
        return res.redirect('/events');
    }
    res.render('events/show', { event });
    const lookUp = Event.collection.find({ _id: req.params.id},
      {
        _id: 1,
        name: 1,
        guests: 1,
        totalGuests: {
          $size: "$guests"
        },
        attendedGuests: {
          $size: {
            "$filter": {
              input: "$guests",
              cond: {
                $eq: [
                  "$$this.attended",
                  "Y"
                ]
              }
            }
          }
        }
      });
};
