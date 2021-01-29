import React from "react";

const CategoryPicker = ({ value, onChange, options }) => (
	<span>
		<select onChange={(e) => onChange(e.target.value)} value={value}>
			{options.map((option) => (
				<option value={option.id} key={option.id}>
					{option.name}
				</option>
			))}
		</select>
	</span>
);

export default CategoryPicker;
