$(document).ready(function () {
    $("#step1 input").click(function () {
        setTimeout(function () {
            $('#surveyContainer').removeClass('surveyContainerOne');
            $('#surveyContainer').addClass('surveyContainerTwo');
            $("#step1").hide();
            $("#step2").fadeIn();
        }, 500);
    });

    $("#step2 input").click(function () {
        setTimeout(function () {
            $('#surveyContainer').removeClass('surveyContainerTwo');
            $('#surveyContainer').addClass('surveyContainerThree');
            $("#step2").hide();
            $("#step3").fadeIn();
        }, 500);
    });

    // Redireciona para URL quando qualquer opção da etapa 3 for clicada (No ou Yes)
    $("#step3 input[type='radio']").click(function () {
        setTimeout(function () {
            window.location.href = "http://everydaywellnessguide.online/app/vsl";
        }, 500);
    });
});