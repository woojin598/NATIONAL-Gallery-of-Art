package kr.co.tj.orderservice.dto;

import java.io.Serializable;
import java.util.Date;

import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@DynamicInsert
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class OrderEntity implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String itemName;
	
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private String itemDescribe;
	
	@Column(nullable = false)
	private long price;
	
	@Column(nullable = false)
	private String staff;
	
	private Date createDate;
	private Date updateDate;

}
