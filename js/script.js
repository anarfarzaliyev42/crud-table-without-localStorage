"use strict";

$(document).ready(function () {
  //  GetAllUsersList();
  //Salary sum written here
    let salarySum=0;
    let allRowstd1=$('tbody tr td');
    allRowstd1.each(function () {
        if($(this)==allRowstd1[2]){
            salarySum+=Number($(this).text());
        }
        
    })


  $(document).on("click", ".add-more-user button", function (event) {
   
     
    // let value=$(event.target);
    // console.log($(value).hasClass('btn','btn-success'));
    
    let allInputs5 = $(".add-edit-table .form-group input");
    allInputs5.each(function (index) {
     $(this).val('');

    })
    $('.add-save-change').attr('disabled', 'disabled');

    $('.add-save-change').css("display", "block");
    $('.edit-save-change').css("display", "none");

    $(".add-edit-table").css("display", "block");


    $(".add-user-header").css("display", "block");
    $(".edit-user-header").css("display", "none");

   
  });
 // Add user save change button start
    $(document).on("click", ".add-edit-table .add-save-change", function () {

      let allInputs = $(".add-edit-table .form-group input");

      let newTrTag = $("<tr></tr>");
      let newTdTag;
      let deleteTd = $(
        "<td><button class='btn btn-danger delete-button'>Delete</button></td>"
      );
      let editTd = $("<td><button class='btn btn-primary edit-button'>Edit</button></td>");

      allInputs.each(function (index) {
        
          if(index==2){
             newTdTag = `<td class='ng-binding salary'>${$(this).val()}</td>`;
          }
          else if(index==3){
            newTdTag = `<td class='ng-binding check-email'>${$(this).val()}</td>`;
          }
          else{
            newTdTag = `<td class='ng-binding'>${$(this).val()}</td>`;
          }
        

        $(newTdTag).appendTo(newTrTag);
      });

      $(editTd).appendTo(newTrTag);
      $(deleteTd).appendTo(newTrTag);
     
      $(newTrTag).insertBefore(".total");
       //Salary sum written here
       salarySum=0;
       allRowstd1=$('tbody tr td');
      allRowstd1.each(function () {
          if($(this).is('.salary')){
              salarySum+=Number($(this).text());
          }
          
      })
      $('.result').text(salarySum);
      $(".add-edit-table").css("display", "none");
    });
    // Add user save change button end
  $(document).on('click', 'tr .edit-button', function () {
    
    $('.add-save-change').css("display", "none");
    $('.edit-save-change').css("display", "block");
    $(".add-edit-table").css("display", "block");
    $(".add-user-header").css("display", "none");
    $(".edit-user-header").css("display", "block");
    let allInputs2 = $(".add-edit-table .form-group input");
    

    let allTd = $(this).closest('tr').find('.ng-binding');
    allTd.each(function (index) {
      $(this).addClass('active-td');
      $(allInputs2[index]).val($(this).text());

    })

    // Edit user save change button start
    $(document).on("click keyup", ".add-edit-table .edit-save-change", function () {
       
      $(".add-edit-table").css("display", "none");
      let allInputs3 = $(".add-edit-table .form-group input");
      let allTd2 = $('.active-td');
      console.log(allTd2);

      allTd2.each(function (index) {
        $(this).text($(allInputs3[index]).val());



        $(this).removeClass('active-td');

      })
       //Salary sum written here
      salarySum=0;
      allRowstd1=$('tbody tr td');
     allRowstd1.each(function () {
         if($(this).is('.salary')){
             salarySum+=Number($(this).text());
         }
         
     })
     $('.result').text(salarySum);
    });
   
    // Edit user save change button end
  })
  
  // Add user Save button disabled end
  // Edit user Save button disabled start
  
  // Edit user Save button disabled end
  // Add user input danger validations start
  $(document).on('keyup blur', ".add-edit-table .form-group input", function () {
          let checkEmail=false;
          let currentInputVal=$(this).val();
          let allEmails=$('tr td');
          allEmails.each(function () {
            if($(this).is('.check-email')){
                  if($(this).text()==currentInputVal){
                      checkEmail=true;
                  }
            }
            
          })
          console.log(checkEmail);
          
          let allInputs8=$(".add-edit-table .form-group input");
          let count2=0;
          let counterDanger=0;
          let dangers=$('.alert-danger');
          dangers.each(function () {
           if($(this).is(':visible')){
             counterDanger++;
           }
            
          })
          
          
          allInputs8.each(function (index) {
           
            if ($(this).val()=='') {
              count2++;
            }

          })
       
         if(count2==0&&(counterDanger==0||counterDanger==1)&&!checkEmail){
          $('.add-save-change').removeAttr('disabled');
          $('.edit-save-change').removeAttr('disabled');
          
          if($(this).is('#editEmail')){
            let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
                if (testEmail.test($(this).val())) {  
                }
                else{
                  $('.add-save-change').attr('disabled','disabled');
                  
                  $('.edit-save-change').attr('disabled','disabled');

                }
            
          }
          if($(this).val()){
         
            if($(this).is('#editName')){
              $(this).next().hide();  
            }
            else if($(this).is('#editCountry')){
              $(this).next().hide();  
            }
            else if($(this).is('#editSalary')){
                  if(Number($(this).val())<=0){
                    $(this).next().show();
                    $('.salary-greater-than').show();
                    $('.please-input-salary').hide();
                  }
                  else if(Number($(this).val())>0){
                    $(this).next().hide();
                    $('.please-input-salary').show();
                    $('.salary-greater-than').hide();
                  }
                  
            }
            
            else if($(this).is('#editEmail')){
              let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
              if(checkEmail){
              
                  
                $(this).next().show();
                $('.valid-email').hide();
                $('.input-email').hide();
                $('.same-email').show();
              
              }
              else if (testEmail.test($(this).val())) {
                $(this).next().hide();
              
              }
               
              else{
                  $(this).next().show();
                  $('.valid-email').show();
                  $('.input-email').hide();
                  $('.same-email').hide();
                }
            }
        }
        else if(!$(this).val()){
         
          if($(this).is('#editName')){
            $(this).next().show();  
          }
          else if($(this).is('#editCountry')){
            $(this).next().show();  
          }
          else if($(this).is('#editSalary')){
            $(this).next().show();
          }
          else if($(this).is('#editEmail')){
            $(this).next().show();   
            $('.valid-email').hide();
            $('.input-email').show();
            $('.same-email').hide();
          }
        }
         }
         else{
          $('.add-save-change').attr('disabled','disabled');
          $('.edit-save-change').attr('disabled','disabled');
          if($(this).val()){
         
              if($(this).is('#editName')){
                $(this).next().hide();  
              }
              else if($(this).is('#editCountry')){
                $(this).next().hide();  
              }
              else if($(this).is('#editSalary')){
                    if(Number($(this).val())<=0){
                      $(this).next().show();
                      $('.salary-greater-than').show();
                      $('.please-input-salary').hide();
                    }
                    else if(Number($(this).val())>0){
                      $(this).next().hide();
                      $('.please-input-salary').show();
                      $('.salary-greater-than').hide();
                    }
                    
              }
              else if($(this).is('#editEmail')){
                
                
                let testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
                if(checkEmail){
              
                  
                  $(this).next().show();
                  $('.valid-email').hide();
                  $('.input-email').hide();
                  $('.same-email').show();
                
                }
                else if (testEmail.test($(this).val())) {
                  $(this).next().hide();
                
                }
                  else{
                    $(this).next().show();
                    $('.valid-email').show();
                    $('.input-email').hide();
                    $('.same-email').hide();
                  }
              }
          }
          else if(!$(this).val()){
           
            if($(this).is('#editName')){
              $(this).next().show();  
            }
            else if($(this).is('#editCountry')){
              $(this).next().show();  
            }
            else if($(this).is('#editSalary')){
              $(this).next().show();
            }
            else if($(this).is('#editEmail')){
              $(this).next().show();   
              $('.valid-email').hide();
              $('.input-email').show();
              $('.same-email').hide();
            }
          }
         
         }
          

  })
  // Add user input danger validations end
  // Delete button
  $(document).on('click', 'tr .delete-button', function () {
    let allInputs7 = $(".add-edit-table .form-group input");
    allInputs7.each(function (index) {
      $(this).val('');
    })

    $(this).closest('tr').remove();
    let deleteSalary=parseInt($(this).closest('tr').find('.salary').text());
    salarySum=0;
      allRowstd1=$('tbody tr td');
     allRowstd1.each(function () {
         if($(this).is('.salary')){
             salarySum+=Number($(this).text());
         }
         
     })
   
     $('.add-edit-table').hide();     
     $('.result').text(salarySum);
  })

  $(document).on('keyup', '.search-input-div input', function () {
    let inputValue = $(this).val().toLowerCase().trim();
    $(".ng-binding").closest('tr').each(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(inputValue) > -1);
    });
  });

  $(document).on('click', '.cancel', function () {
    let allInputs6 = $(".add-edit-table .form-group input");
    allInputs6.each(function (index) {
      console.log($(this).val(''));

    })
    $(".add-edit-table").css("display", "none");
  })

//   let obj = {};
//   let counter = 1;
// $(document).on("click", ".add-edit-table .add-save-change", function () {


//   let user = {
//       Name: $("#editName").val(),
//       Country: $("#editCountry").val(),
//       Salary: $("#editSalary").val(),
//       Email: $('#editEmail').val()
//   }

//   if (obj[`user-${counter}`] == undefined) {
//       obj[`user-${counter}`] = [];
//   }
// console.log(counter);

//   obj[`user-${counter}`].push(user);

//   localStorage.setItem("users", JSON.stringify(obj));

//   counter++;
// console.log(counter);


// });

// function GetAllUsersList(){
//   let localUser = localStorage.getItem("users");

//   let obj = JSON.parse(localUser);


// for (const key in obj) {
//   console.log(key);
  
//   if (obj.hasOwnProperty(key)) {
//       const element = obj[key];
//         console.log(element);
        
//       element.forEach(e => {
//           $(`<tr >
//           <td class'ng-binding'>${e.Name}</td>
//           <td class'ng-binding'>${e.Country}</td>
//           <td class'ng-binding'>${e.Salary}</td>
//           <td class'ng-binding'>${e.Email}</td>
//           <td class'ng-binding'><button class='btn btn-primary edit-button'>Edit</button></td>
//           <td class'ng-binding'><button class='btn btn-danger delete-button'>Delete</button></td>
//           </tr>`).insertBefore('.total-row');
//       });
//   }
// }
// }


});