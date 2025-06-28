
import styles from '@styles/buffer.module.css';
import { useEffect, useState } from 'react';

interface props {
	yellowZone: number,
	redZone: number,
	greenZone: number,
}

export default function BufferChart({ greenZone, redZone, yellowZone }: props) {
	const [tamBuffer, setTamBuffer] = useState(100)

	useEffect(()=>{
		setTamBuffer(greenZone+redZone+yellowZone)
	},[greenZone, redZone, yellowZone])

	return <div>
		<div className={styles.buffer}>
			<div className={styles.greenzone} style={{
				height: `${(greenZone/tamBuffer)*100}%`,
			}}>{redZone+yellowZone+greenZone}<span>[{greenZone}]</span></div>
			<div className={styles.yellowzone} style={{
				height: `${(yellowZone/tamBuffer)*100}%`,
			}}>{redZone+yellowZone}<span>[{yellowZone}]</span></div>
			<div className={styles.redzone} style={{
				height: `${(redZone/tamBuffer)*100}%`,
			}}>{redZone}<span>[{redZone}]</span></div>
		</div>
	</div>;
}
