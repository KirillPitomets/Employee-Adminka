import React from 'react'

export interface ICustomInput extends React.InputHTMLAttributes<HTMLInputElement> { 
	isConfigPassword?: boolean	
}