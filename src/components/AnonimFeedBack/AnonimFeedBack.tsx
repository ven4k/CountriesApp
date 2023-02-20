import { Button, TextField } from "@mui/material";
import { FC, useState } from "react";

export const AnonimFeedBack:FC = () => {
    const [nick, setNick] = useState<string>('');
    const [opinion, setOpinion] = useState<string>('')
    const [email, setEmail] = useState('');
    
    return (
        <div>
            <form>
                <TextField label="Nickname" value={nick} onChange={(e) => setNick(e.target.value)} required error={!nick}/>
                <TextField label="write your opinion" value={opinion} onChange={(e) => setOpinion(e.target.value)} required />
                <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <Button onClick={(e) => e.preventDefault() } disabled={(!nick && !opinion) ? true : false}>Send</Button>
            </form>
        </div>
    )
}