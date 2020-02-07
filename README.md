# gagtivate-backend

GAGTiv8

## .env

SECRET=123
PRIVATE_KEY=gulugulu
GOOGLE_PASS=uculul
CLIENT_ID="QEQSDF\$W%TADDFGDXADSF.COM"

## Sign In

Sign in to the app

#### URL

-   /signin

#### Method:

-   POST

#### URL Params

##### Required:

-   None

##### Data Params

-   None

#### Success Response:

Code: 200

```
Content: {
    token : "adafdadfwqrewqreasfdfadsasdf",
    id : 1
        }
```

#### Error Response:

Code: 400 BAD REQUEST

```
Content: { msg : "Validation Error" }
```

Code: 500 NOT FOUND

```
Content: { msg : "Server Error" }
```

## Find All

Returns the all posted data.

#### URL

-   /

#### Method:

-   GET

#### URL Params

##### Required:

-   None

##### Data Params

-   None

#### Success Response:

Code: 200

```
Content: [
        {
            "id": 1,
            "title": "Li Wenliang is one of the first doctor who tried to warn his colleagues about Coronavirus outbreak. The CPC summons him, and covered the affair. He died today, everybody in China talke about him, how he is a hero, criticize the Party. Something happens.",
            "url": "https://img-9gag-fun.9cache.com/photo/aGgb5Ez_460swp.webp",
            "tags": "Corona",
            "UserId": 1,
            "createdAt": "2020-01-30T12:28:36.353Z",
            "updatedAt": "2020-01-30T12:28:36.353Z"
        },
        {
            "id": 2,
            "title": "PS, autocad, windows, office, antivirus, music, movies, I could go on...but I wont. Long life to p2p!!",
            "url": "https://img-9gag-fun.9cache.com/photo/awovpn4_700bwp.webp",
            "tags": "IT",
            "UserId": 2,
            "createdAt": "2020-01-31T12:28:36.353Z",
            "updatedAt": "2020-01-31T12:28:36.353Z"
        }]
```

#### Error Response:

Code: 500 NOT FOUND

```
Content: { msg : "Server Error" }
```

## Post

Post the picture.

#### URL

-   /

#### Method:

-   POST

#### URL Params

##### Required:

-   None

##### Data Params

```
data : {
        title : string,
        url : string,
        tags : string,
        UserId : integer,
        createdAt : date,
        updatedAt : date
    }
```

#### Success Response:

Code: 201

```
Content: {}
```

#### Error Response:

Code: 500 NOT FOUND

```
Content: { msg : "Server Error" }
```

## Update

Update the Post.

#### URL

-   /

#### Method:

-   PUT

#### URL Params

##### Required:

-   id: integer

##### Data Params

```
data : {
    title : string,
    url : string,
    tags : string,
    UserId : integer,
    createdAt : date,
    updatedAt : date
}
```

#### Success Response:

Code: 200

```
Content: { msg : "Update Data Post success" }
```

#### Error Response:

Code: 400

```
Content: { msg : "Validation Error" }
```

Code: 404 NOT FOUND

```
Content: { msg : "No updated data Post rows" }
```

Code: 500 NOT FOUND

```
Content: { msg : "Server Error" }
```

## Delete

Delete the Post

#### URL

-   /

#### Method:

-   DELETE

#### URL Params

##### Required:

-   id: integer

##### Data Params

-   None

#### Success Response:

Code: 200

```
Content: {
    data : 1
    msg: "Delete Data Success"
}
```

#### Error Response:

Code: 404 NOT FOUND

```
Content: { msg : "No deleted data Post rows" }
```

Code: 500 NOT FOUND

```
Content: { msg : "Server Error" }
```

## FindById

Find the Post

#### URL

-   /

#### Method:

-   GET

#### URL Params

##### Required:

-   id: integer

##### Data Params

-   None

#### Success Response:

Code: 200

```
    data: {
        "id": 1,
        "title": "Li Wenliang is one of the first doctor who tried to warn his colleagues about Coronavirus outbreak. The CPC summons him, and covered the affair. He died today, everybody in China talke about him, how he is a hero, criticize the Party. Something happens.",
        "url": "https://img-9gag-fun.9cache.com/photo/aGgb5Ez_460swp.webp",
        "tags": "Corona",
        "UserId": 1,
        "createdAt": "2020-01-30T12:28:36.353Z",
        "updatedAt": "2020-01-30T12:28:36.353Z"
    }
```

#### Error Response:

Code: 404 NOT FOUND

```
Content: { "msg": "No result data Post rows" }
```
