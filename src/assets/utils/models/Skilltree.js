import Model from "./Model"
import axios from "axios"
import BASE_URL from '../consts'


class Skilltree extends Model {
    static app_name = 'skilltree'
    static model_name = 'skilltree'

    constructor({id, name, is_under_changing, last_modified,
                 root_node, tree_structure, agree_num, disagree_num}) {
        super({is_under_changing, root_node})

        // required data fields
        this.app_name = 'skilltree'
        this.model = "skilltree"
        this.pk = id

        // this custom data for Series
        this.name = name
        this.last_modified = last_modified
        this.tree_structure =tree_structure
        this.agree_num = agree_num
        this.disagree_num = disagree_num
        this.modify_queue = []
    }

    // custom methods

    // recursively find a sub tree which has 
    // node name equal to the input root name
    _find_sub_tree(tree, root_name) {
        if (tree.node.name == root_name) {
            return {
                target: tree,
                parent: ""
            }
        }
        for (let sub_tree of tree.sub_trees) {
            let res = this._find_sub_tree(sub_tree, root_name)
            if (res != null) {
                if (res.parent == "") {
                    res.parent = tree
                    return res
                }
                return res
            }
        }
        return null
    }

    // find sub tree which has node name
    // equal to the input root name
    get_sub_tree(root_name) {
        let res = this._find_sub_tree(this.tree_structure, root_name)
        return res
    }

    create_node(node_name, new_node_name) {
        let res = this.get_sub_tree(node_name)
        let node = res.target
        node.sub_trees.push({
            node: {name: new_node_name},
            sub_trees: []
        })

        this.modify_queue.push({
            type: "create",
            targets: {node_name, new_node_name}
        })
    }

    delete_sub_tree(node_name, commit=true) {
        let res = this.get_sub_tree(node_name)
        let parent = res.parent
        for (let i in parent.sub_trees) {
            if (parent.sub_trees[i].node.name == node_name) {
                parent.sub_trees.splice(i, 1)
                if (commit) {
                    this.modify_queue.push({
                        type: "delete",
                        targets: {node_name}
                    })
                }
                return
            }
        }
    }

    move_sub_tree(node_name, to_node_name) {
        let res = this.get_sub_tree(node_name)

        // stash the sub tree in target
        let target = res.target

        // remove it from the old spot
        this.delete_sub_tree(node_name, false)

        res = this.get_sub_tree(to_node_name)
        let node = res.target
        // place the sub_tree in the sub_trees array
        node.sub_trees.push(target)

        this.modify_queue.push({
            type: "move",
            targets: {node_name, to_node_name}
        })
    }


    // commit all the modifications in the modify_queue
    // to the backend
    async commit() {
        let res = await axios.post(
            BASE_URL+`${this.app_name}/skilltree_handler/${this.pk}/`,
            { modify_queue: this.modify_queue }
        )
        // empty the modify_queue for the next commit
        this.modify_queue = []
        this.tree_structure = res.data
    }

    // get model by id
    static async get(id) {
        let res = await axios.get(BASE_URL+`${this.app_name}/skilltree_handler/${id}/`)
        return new Skilltree(res.data)
    }
}

export default Skilltree
