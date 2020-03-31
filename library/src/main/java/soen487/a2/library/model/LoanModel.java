package soen487.a2.library.model;

public class LoanModel {
    private int id;
    private String title;
    private String member;
    private String borrowdate;
    private String returndate;

    public LoanModel() {
    }

    public LoanModel(int id, String title, String member, String borrowdate, String returndate) {
        this.id = id;
        this.title = title;
        this.member = member;
        this.borrowdate = borrowdate;
        this.returndate = returndate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMember() {
        return member;
    }

    public void setMember(String member) {
        this.member = member;
    }

    public String getBorrowdate() {
        return borrowdate;
    }

    public void setBorrowdate(String borrowdate) {
        this.borrowdate = borrowdate;
    }

    public String getReturndate() {
        return returndate;
    }

    public void setReturndate(String returndate) {
        this.returndate = returndate;
    }
}
