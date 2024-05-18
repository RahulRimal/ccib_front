
class LoanApplication {

    constructor(idx, amount, status, finance, user) {
        this.idx = idx;
        this.amount = amount;
        this.status = status;
        this.finance = finance;
        this.user = user;
    }

    static fromJson(json) {
        return new LoanApplication(
            idx = json.idx,
            amount = json.loan_amount,
            status = json.status,
            user = json.user,
            finance = json.finance
        );
    }

    toJson() {
        return {
            idx: this.idx,
            loan_amount: this.amount,
            status: this.status,
            user: this.user.toJson(),
            finance: this.finance.toJson()
        }
    }


}

export default LoanApplication;