package kr.co.tj.dto;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="cart")
public class CartEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(generator = "id-uuid")
	@GenericGenerator(strategy = "uuid" , name = "id-uuid")
	private String id;
	
	@Column(nullable = false)
	private String itemName;
	
	@Column(nullable = false)
	private long qty; //상품수량
	
	@Column(nullable = false)
	private long unitPrice; //개별가격
	
	@Column(nullable = false)
	private long totalPrice; //합산가격
	
	private Date createDate; //데이터생성일시
	
	private Date updateDate; //업뎃일시
	

}
