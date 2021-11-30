// here is the structure of the mongodb model
// keep in mind the guests are in a nested array

const eventSchema = new Schema({
  event_name: String,
  venue_name: String,
  address: String,
  description: String,
  type: String,
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist'
  },
  guests: [
    {
      phone: Number,
      attended: String // this will be the "yes" or "no" from the prompt page
      //ref: 'Guest'
    }
  ],
  created: {
    type: Date,  // Captures both date and time
    default: Date.now
  },
  event_start: {
    type: Date,
    required: [true, 'Date & time of event start required']
    },
  event_end: {
    type: Date,
    required: [true, 'Date & time of event end required']
  },
  notification: {
    type: String,
    default: 30
  },
}, opts);
