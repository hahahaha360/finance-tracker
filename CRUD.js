     let amount = document.getElementById("amount");
     let submitbtn = document.getElementById("submitbtn");
     const balance = document.getElementById("balanceText");
     let TransactionBody = document.getElementById("TransactionBody");
     let date = document.getElementById("date");
     let type = document.getElementById("type");
     let desc = document.getElementById("description");
     let income = document.getElementById("income");
     let expenses = document.getElementById("expenses");
   
     let currentBalance = 0;
     let totalIncome = 0;
     let totalExpense = 0;
     let myChart;
     let polarChart;

     const ctx = document.getElementById("myChart");
     const ctx2 = document.getElementById("polarChart");
     let categories = { Transportation: 0, //obj literals
                        Utilities: 0,
                        Food: 0,
                        Shopping: 0,
                        Investment: 0,
                        Savings : 0
                     }
     
     
     submitbtn.addEventListener('click', () => {
       let newAmount = Number(amount.value);
       
        if(!amount.value || !date.value || !type.value|| !desc.value){
         alert("Fill all the fields!");
         return;
      }
      if(newAmount <= 0){
         alert("Amount must be greater than 0.");
      }

        if(type.value === "expense"){
           currentBalance -= newAmount;
           totalExpense += newAmount; //totalexpense = totalexpense + newAmount
          }else{
           currentBalance += newAmount;
           totalIncome += newAmount;
          }
          balance.textContent = " ₱ " + currentBalance;
         
          
          let selectedCategory = desc.value;
        if(type.value === "expense"){
          categories[selectedCategory] += newAmount; 
        }
      
    let row = `
      <tr>
         <td>${date.value}</td>
         <td>${type.value}</td>
         <td>${"₱"+amount.value}</td>
         <td>${desc.value}</td>
      </tr>
    `;
    TransactionBody.innerHTML += row; 

     amount.value = "";
     type.value = "income";  
     desc.value = "none";  
    
   if(myChart){
    myChart.destroy();   // remove the old chart
   }
   myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
         labels: ["Income", "Expenses"],
         datasets: [{
               data: [totalIncome, totalExpense],
               borderWidth: 0
           }]
         
       }
    });

    if(polarChart){
     polarChart.destroy();  
    }
    polarChart = new Chart(ctx2, {
       type: "polarArea",
       data: {
           labels: Object.keys(categories),
           datasets: [{
               data: Object.values(categories),
               borderWidth: 0
           }]
       }
       
    });
    
  })
