package in.natwest.user.model;

import jakarta.persistence.*;

@Entity
@Table(name="REGD_USERS")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto generating ID
    private int userId;
    @Column(name="full_name",columnDefinition = "varchar(50)")
    private String name;
    private String password;

    public User(int userId, String name, String password) {
        this.userId = userId;
        this.name = name;
        this.password = password;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User() {
    }
}
