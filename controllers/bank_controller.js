const e = require('express');
const sql = require('../db_config');
class BankController {
    static async homePage(req, res) {
        res.render('home',{error:req.query.error});
    }

    static async allCustomerPage(req,res){
        try{
            const [userDetails] = await sql`SELECT * FROM customer WHERE id=0`;
            const allOtherCustomers = await sql `SELECT * FROM customer WHERE id!=0 ORDER BY id`;
            res.render('all_customers',{
                error:req.query.error,
                success:req.query.success,
                userDetails:userDetails,
                allCustomers:allOtherCustomers,
            })
        }catch(e){
            res.redirect(`/?error=${e}`);
        }
    }

    static async singleCustomerPage(req,res){
        try{
        const [userDetails] = await sql`SELECT * FROM customer WHERE id=0`;
        const [recieverDetails] = await sql `SELECT * FROM customer WHERE id=${req.params.id}`;
        if(recieverDetails==undefined){
            res.send(404).render('404');
        }else{
        res.render('single_customer',{
            error:req.query.error,
            success:req.query.success,
            userDetails,
            recieverDetails,
        })}
        }catch(e){
            res.redirect(`/all_customers?error=${e}`);
        }
    }

    static async getAccountBalance(id){
        try{
            const [details] = await sql`SELECT balance FROM customer WHERE id=${id};`
            return details.balance;
        }catch(e){
            res.send(500).render('500');
        }
    }

    static async transfer(req,res){
        try{
            const senderId = req.body.senderId;
            const recId = req.body.recId;
            const amount = parseFloat(req.body.amount);
            if(!req.body.amount){
                res.redirect(`/transfer/${req.body.recId}?error=No Amount Specified forTransaction`);
                return
            }
            const oldSenderBalance = await BankController.getAccountBalance(senderId);
            const oldRecieverBalance = await BankController.getAccountBalance(recId);
            const newSenderBalance = (oldSenderBalance - amount).toFixed(2);
            const newreciverBalance = (oldRecieverBalance + amount).toFixed(2);
            if(newSenderBalance<0){
                res.redirect(`/transfer/${req.body.recId}?error=Insufficient Account Balance for Transaction`);
                return
            }
            await sql.begin(async sql => {
                await sql`
                  INSERT INTO transfers (from_id,to_id,amount) values (${senderId},${recId},${amount});`

                await sql`
                  UPDATE customer SET balance=${newSenderBalance} WHERE id=${senderId};`
                
                await sql`
                  UPDATE customer SET balance=${newreciverBalance} WHERE id=${recId};`
              });
            res.redirect(`/all_customers?success=Transaction Successful`);
        }catch(e){
            res.redirect(`/transfer/${req.body.recId}?error=${e}`);
        }
    }

    
}

module.exports = BankController;