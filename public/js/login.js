
(function () {
    $(function () {
        $("input#submit").click(function (e) {
            e.preventDefault && e.preventDefault();
            console.log("login submit click");

            $.ajax({
                url: '/auth/login',
                data: $("form").serialize(),
                method: "POST",
            }).then((res) => {
                console.log(res);
                if (res.error) {
                    alert("Error:", res.message);
                }
                localStorage.setItem("token", res.data.token);
                location.href = '/editor.html';
            }).catch(error => {
                console.error(error);
            });
        });
    });
})();