import axios from 'axios'
import BASE_URL from '../consts'

class MyDate {
    constructor(year, month, date) {
        this._date = new Date(year, month-1, date)
    }

    getYear() { return this._date.getFullYear() }
    getMonth() { return this._date.getMonth()+1 }
    getDate() { return this._date.getDate() }
    getDay() { return this._date.getDay() }

    setYear(year) { return this._date.setFullYear(year) }
    setMonth(month) { return this._date.setMonth(month-1) }
    setDate(date) { return this._date.setDate(date) }

    toString() { return `${this.getYear()}-${this.getMonth()}-${this.getDate()}` }

    is_leap() { 
        let year = this.getYear()
        return (year % 100 != 0 && year % 4 == 0) || (year % 400 == 0) 
    }


    _add_one_day() {
        let year = this.getYear()
        let month = this.getMonth()
        let date = this.getDate()

        let is_leap = this.is_leap()
        let s_month = [2, 4, 6, 9, 11]

        let end_of_month
        for (let m of s_month) {
            if (month == m) {
                if (is_leap == true) {
                    if (month == 2) {
                        end_of_month = 29
                        break
                    } else {
                        end_of_month = 30
                        break
                    }
                } else {
                    if (month == 2) {
                        end_of_month = 28
                        break
                    } else {
                        end_of_month = 30
                        break
                    }
                }
            }
        }
        end_of_month = end_of_month == undefined ? 31 : end_of_month

        if (date+1 > end_of_month) {
            if (month == 12) {
                this.setDate(1)
                this.setMonth(1)
                this.setYear(year+1)
            } else {
                this.setDate(1)
                this.setMonth(month+1)
            }
        } else {
            this.setDate(date+1)
        }
    }

    add(num_of_date) {
        for(let i = 0; i < num_of_date; i++) {
            this._add_one_day()
        }
    }

    is_equal(date) {
        return this.toString() === date.toString()
    }

    is_greater(date) {
        if (this.getYear() > date.getYear()) return 1
        else if (this.getYear() == date.getYear()) {
            if (this.getMonth() > date.getMonth()) return 1
            else if (this.getMonth() == date.getMonth()) {
                if (this.getDate() > date.getDate()) return 1
                else if (this.getDate() == date.getDate()) return 0
                return -1
            }
            return -1
        }
        return -1
    }

    delta(date) {
        let sign = this.is_greater(date)
        let subtractor = sign > 0 ? date : this
        let minuend = sign > 0 ? this : date
        let counter = 0
        while (!subtractor.is_equal(minuend)) {
            counter++
            subtractor.add(1)
        }
        return sign * counter
    }

    copy() {
        let year = this.getYear()
        let month = this.getMonth()
        let date = this.getDate()
        return new MyDate(year, month, date)
    }
}

class Coordinate2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    moveDown(px) { this.y += px }
    moveRight(px) { this.x += px }
}

//colors
const WHITE = "#FFFFFF";
const LIGHT_PURPLE = "#d7c8ff"
const PURPLE = "#b17aff"
const HEAVY_PURPLE = "#731eea"
const DARK_PURPLE = "#441b7f"
const BACKGROUND_COLOR = "#E6E6FA"

//standards
const UPPER_LIMIT = 25
const LOWER_LIMIT = 5
const LEVEL = (UPPER_LIMIT - LOWER_LIMIT) / 4

 //constants of scale
const SCALE_SQUARE = 0.01135
const SCALE_GAP = 0.0067

const colorMap = [
    {score: LOWER_LIMIT, color: WHITE},
    {score: LOWER_LIMIT + LEVEL * 1, color: LIGHT_PURPLE},
    {score: LOWER_LIMIT + LEVEL * 2, color: PURPLE},
    {score: LOWER_LIMIT + LEVEL * 3, color: HEAVY_PURPLE},
    {score: UPPER_LIMIT, color: DARK_PURPLE},
]
const TODAY = new Date()
const FIRST_DAY = new MyDate(TODAY.getFullYear(), 1, 1)
let col_num = Math.ceil((FIRST_DAY.is_leap() ? 366 : 365) / 7)

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

class Square {
    constructor(date, score) {
        this.date = date
        this.score = score
        this.resize()
    }

    resize() {
        this.square_length = window.innerWidth * SCALE_SQUARE
        this.gap_length = window.innerHeight * SCALE_GAP
        this.step = this.square_length + this.gap_length
        this.origin = new Coordinate2D(1.5*this.step, this.step)
        this.coordinate = this.getSpot()
    }

    getColor() {
        let i = 0
        while (i < colorMap.length) {
            if (this.score < colorMap[i].score) return colorMap[i].color
            i++
        }
        return colorMap[i-1].color
    }

    getSpot() {
        let week = Math.floor(this.date.delta(new MyDate(this.date.getYear(), 1, 1)) / 7)
        let day = this.date.delta(new MyDate(this.date.getYear(), 1, 1)) % 7
        let coordinate = new Coordinate2D(this.origin.x, this.origin.y)
        coordinate.moveDown(day*this.step)
        coordinate.moveRight(week*this.step)
        return coordinate
    }

    draw(context) {
        context.fillStyle = this.getColor()
        context.fillRect(this.coordinate.x,
                         this.coordinate.y,
                         this.square_length,
                         this.square_length)
    }
}

class Activity {
    constructor(canvas_id, table) {
        this.canvas = document.getElementById(canvas_id)
        this.context = this.canvas.getContext('2d')
        this.table = table
        this.resize()
    }

    resize() {
        this.square_length = window.innerWidth * SCALE_SQUARE
        this.gap_length = window.innerHeight * SCALE_GAP
        this.edge_length = this.square_length + this.gap_length
        this.canvas.width = col_num * this.square_length + (col_num-1) * this.gap_length + 2 * this.edge_length
        this.canvas.height = 7 * this.square_length + 6 * this.gap_length + 2 * this.edge_length
        this.drawBackground()
        this.draw()
    }

    drawBackground() {
        this.context.fillStyle = BACKGROUND_COLOR
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillStyle = "#000000"
        this.context.font = "12px serif"
        let days = []
        for (let i = FIRST_DAY.getDay(); i < FIRST_DAY.getDay() + 7; i++)
            days.push(WEEKDAYS[(i-1)%7])

        for (let i = 0; i < 7;  i++) {
            let offset = 1.55*this.edge_length
            this.context.fillText(days[i], this.edge_length/2, i*(this.edge_length) + offset)
        }
        for (let i = 0; i < 12; i++) {
            let offset = this.edge_length + this.square_length * 3
            let gap = 4.3 * this.edge_length
            this.context.fillText(MONTHS[i], i*gap + offset, 0.7*this.edge_length)
        }
        this.context.fillText(TODAY.getFullYear(), this.canvas.width/2, this.canvas.height)
    }

    draw() {
        for (let square of this.table) {
            square.draw(this.context)
        } 
    }

    static async getActivity(user_id) {
        let res = await axios.get(BASE_URL + `user/getactivitytable/${user_id}/`)
        let scores_list = res.data

        for (let i in scores_list) {
            let [year, month, date] = scores_list[i].date.split("-")
            scores_list[i].date = new MyDate(year, month, date)
        }
        
        let this_year = new Date().getFullYear()
        let start = new MyDate(this_year, 1, 1)
        let end = new MyDate(this_year+1, 1, 1)

        let table = []

        while(!start.is_equal(end)) {
            for (let i in scores_list) {
                if (start.is_equal(scores_list[i].date)) {
                    table.push(new Square(scores_list[i].date, scores_list[i].score))
                    start.add(1)
                    continue
                }
            }
            table.push(new Square(start.copy(), 0))
            start.add(1)
        }
        return table
    }
}

export default Activity