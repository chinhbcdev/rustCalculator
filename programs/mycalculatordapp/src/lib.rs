use anchor_lang::prelude::*;

declare_id!("DEwWa6gBzk7jew94jHKExZQXAneGByR6QUepkzG9DinE");

#[program]
pub mod mycalculatordapp {
    use super::*;

    // pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
    //     Ok(())
    // }
    pub fn create(ctx: Context<Create>,init_message: String) -> Result<()> {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }

    pub fn add(ctx:Context<Addition>, num1: i64, num2: i64) -> Result<()>{
        let x = &mut ctx.accounts.sum;
        x.resultx= num1+num2;
        Ok(())
    }
}
#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub sum: Account<'info, Caculator>,
}

// #derive(Accounts)
#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init,payer=user, space=264)]
    pub calculator: Account<'info, Caculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info,  System>
}

#[account]
pub struct Caculator{
    pub greeting:String,
    pub result: i64,
    pub remainder: i64
}