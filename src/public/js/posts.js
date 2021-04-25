$(document).ready(function () {
    $(".vote-up").submit(function (e) {
        e.preventDefault()
        console.log()
        let postId = $(this).data("id")
        console.log(postId)
        $.ajax({
            type: "PUT",
            url: "posts/" + postId + "/vote-up",
            success: function (data) {
                console.log("voted up!")
            },
            error: function (err) {
                console.log(err.messsage)
            }
        })
    })

    $(".vote-down").submit(function (e) {
        e.preventDefault()

        let postId = $(this).data("id")
        $.ajax({
            type: "PUT",
            url: "posts/" + postId + "/vote-down",
            success: function (data) {
                console.log("voted down!")
            },
            error: function (err) {
                console.log(err.messsage)
            }
        })
    })

    $(".vote-up-post").submit(function (e) {
        e.preventDefault()

        let postId = $(this).data("id")
        console.log(postId)
        $.ajax({
            type: "PUT",
            url: "" + postId + "/vote-up",
            success: function (data) {
                console.log("voted up!")
            },
            error: function (err) {
                console.log(err.messsage)
            }
        })
    })

    $(".vote-down-post").submit(function (e) {
        e.preventDefault()

        let postId = $(this).data("id")
        $.ajax({
            type: "PUT",
            url: "" + postId + "/vote-down",
            success: function (data) {
                console.log("voted down!")
            },
            error: function (err) {
                console.log(err.messsage)
            }
        })
    })
})