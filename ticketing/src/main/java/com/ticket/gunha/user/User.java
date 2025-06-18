package com.ticket.gunha.user;

import com.ticket.gunha.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users")
public class User extends BaseEntity {

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private Long id;

    @Column(unique = true)
    private String userEmail;

    public static User createUser(String userEmail){
        User user = new User();
        user.userEmail = userEmail;
        return user;
    }
}
