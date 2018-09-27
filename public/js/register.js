
(function() {
    $(function() {
        $("input#submit").click(function(e) {
            e.preventDefault && e.preventDefault();
            console.log("submit click");
            $.ajax({
                url: '/auth/register',
                data: $("form").serialize(),
                method: "POST",
            }).then((res) => {
                console.log(res);
                if (res.error) {
                    alert("Error:", res.message);
                }
                location.href = '/auth/login';
            }).catch(error => {
                console.error(error);
            });
        });
    });
})();