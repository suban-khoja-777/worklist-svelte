##Steps to create a new User.

1. Create an Account in firebase and copy the user-id. 
2. Go to dyalist and create a note with the same user id.
3. Copy the dynalist document id from url.
4. Go to salesforce and create a new record of User Mappings Metadata with following details
  - label - firebase_uid
  - Name - USER_v2_firebase_uid
  - user_id - firebase_uid
  - file_id - dyalist file id 
5. Reset the password.
  - 
