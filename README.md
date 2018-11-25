# PollingApp

# MySQL Database
**Host:** localhosts

**Database Name:** polling

**Username:** pollinguser

**Password:** polling

We will use two tables:

One to keep track of a list of meet ups and another to keep track of a list of attendees who have submitted input.

## Table 1 - To keep track of the meetups

    Table name: meetup

    Fields: name (varchar 255), description (varchar 255), date (varchar 255), start (varchar 255), end (varchar 255), id (int) [primary key]



## Table 2 - To keep track of the attendees

    Table name: attendee

    Fields: name (varchar 255), meetID (int), start (varchar 255), end (varchar 255)


## Database & Table Details

Intervals
    For events that are <= 2 hours in length, the intervals will be 15 minutes.
    For events that are > 2 hours in length, the intervals will be 30 minutes.

Clicking on the table
    Clicking on the table will trigger an event that'll change the cell to green to flag visually that it's selected.

On hitting submit after the the availability times on the table have been clicked, we will make a SEPERATE query to insert data in the database for every single cell that is green (selected) in the table.

Example 
    Bill can attend an event and hits table cells for 4:00 to 4:30, 4:30 to 5:00, 5:00 to 5:30.

    Instead of one insert query into the database going from (start) 4:00 to (end) 5:30 we make those 3 seperate inserts
    for intervals of 30. (or 15 depending on the event.)

    That way, Bill can say he's free from 3:00 to 5:00 but also jump ahead and say he's also from from 7:00 to 7:30.

    Note: When displaying availability data, we only count UNIQUE names when counting the number of people attending a meet up.
    So these multiple entries by Bill won't be a problem.



NOTE: Didn't finish fixing the table yet, but it's not correctly showing xx:xx to yy:yy yet with correct intervals. Something w my math was wrong. # of rows should be correct though besides with a couple edge cases I haven't tested yet.
