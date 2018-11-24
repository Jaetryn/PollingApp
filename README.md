# PollingApp

# MySQL Database
Host: localhosts
Database Name: polling
Username: pollinguser
Password: polling

We will use two tables:
One to keep track of a list of meet ups and another to keep track of a list of attendees who have submitted input.

Table 1 - To keep track of the meetups
Table name: meetup
Fields: name (varchar 255), description (varchar 255), date (varchar 255), start (varchar 255), end (varchar 255), id (int) [primary key]



Table 2 - To keep track of the attendees
Table name: attendee
Fields: name (varchar 255), meetID (int), ... im still figuring out what else to include.. edit whenever.

# Questions
How will we split up the times for users to submit availability data? 

IE. What are the intervals? 30 mins? 15 mins? an hour?

Will they stay constant regardless of the event length?

If intervals are 15 mins, there'd be four checkboxes for a 1 hour event and 40 checkboxes for a 10 hour event.

Or instead of checkboxes, let them enter their own custom range?

Not sure how we should handle this.

ALSO: On my end, i made the verification require that meet ups don't last longer than a day or go into a new day. (Past 11:59 PM) to make this less complicated for us.